#!/usr/bin/env python3
"""بررسی کنترل کیفیت خروجی بیلد بخش خدمات سلامت (اجرا روی dist/)."""
import io, json, os, re, sys, glob
from html.parser import HTMLParser

DIST = 'dist'
HEALTH_PAGES = [
    'health/index.html',
    'health/health-card/index.html',
    'health/hygiene-training/index.html',
    'health/hygiene-qualification/index.html',
    'health/audit-contracts/index.html',
]
PHONES = ['tel:+989398520150', 'tel:+982833992550']
MAPS = 'https://www.google.com/maps?q=36.2678594,50.0135519'
QR = '/images/brand/office-location-qr.svg'

problems = []
warnings = []


def check(cond, msg):
    if not cond:
        problems.append(msg)


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.lang_switch = 0
        self.ids = {}
        self.labels_for = []
        self.inputs = []
        self.headings = []
        self._stack = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a':
            self.hrefs.append(a.get('href', ''))
            if a.get('hreflang') in ('en', 'fa'):
                self.lang_switch += 1
        if tag in ('input', 'select', 'textarea'):
            self.inputs.append((a.get('id'), a.get('type', 'text'), a.get('name')))
        if tag == 'label':
            self.labels_for.append(a.get('for'))
        if tag in ('h1', 'h2', 'h3', 'h4'):
            self._stack.append(tag)
        if 'id' in a:
            self.ids[a['id']] = self.ids.get(a['id'], 0) + 1

    def handle_endtag(self, tag):
        if tag in ('h1', 'h2', 'h3', 'h4') and self._stack:
            self.headings.append(self._stack.pop())


def local_target(href):
    """نگاشت href داخلی به فایل dist (بدون در نظر گرفتن base)."""
    if href.startswith('#') or href.startswith('mailto:') or href.startswith('tel:') or href.startswith('sms:'):
        return None
    if '://' in href:
        return 'external'
    path = href.split('#')[0].split('?')[0]
    if not path.startswith('/'):
        return None
    rel = path.lstrip('/')
    if rel.endswith('/'):
        rel += 'index.html'
    return os.path.join(DIST, rel)


titles = {}
for rel in HEALTH_PAGES:
    path = os.path.join(DIST, rel)
    check(os.path.exists(path), f'missing page: {path}')
    if not os.path.exists(path):
        continue
    s = io.open(path, encoding='utf-8').read()
    p = Links()
    p.feed(s)

    check('<html lang="fa" dir="rtl">' in s, f'{rel}: not RTL/fa')
    check('hreflang="en"' not in s, f'{rel}: unexpected en hreflang')
    check('rel="canonical"' in s, f'{rel}: no canonical')
    check(p.lang_switch == 0, f'{rel}: language switch present ({p.lang_switch})')

    for phone in PHONES:
        check(phone in s, f'{rel}: missing {phone}')
    check(MAPS in s, f'{rel}: missing maps link')
    check(QR in s, f'{rel}: missing QR image')

    # JSON-LD
    ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
    types = []
    for block in ld:
        data = json.loads(block.replace('\\u003c', '<'))
        types += [d.get('@type') for d in (data if isinstance(data, list) else [data])]
    for expected in (['LocalBusiness', 'BreadcrumbList'] if rel.endswith('health/index.html')
                     else ['LocalBusiness', 'Service', 'FAQPage', 'BreadcrumbList']):
        check(expected in types, f'{rel}: JSON-LD missing {expected} (found {types})')

    # عنوان یکتا
    title = re.search(r'<title>(.*?)</title>', s).group(1)
    titles.setdefault(title, []).append(rel)

    # یک h1
    check(p.headings.count('h1') == 1, f'{rel}: expected exactly one h1, got {p.headings.count("h1")}')

    # شناسه تکراری
    dupes = [k for k, v in p.ids.items() if v > 1]
    check(not dupes, f'{rel}: duplicate ids {dupes}')

    # لینک‌های داخلی
    for href in p.hrefs:
        t = local_target(href)
        if t == 'external':
            check(href.startswith('https://'), f'{rel}: insecure external link {href}')
            continue
        if t:
            check(os.path.exists(t), f'{rel}: broken internal link {href} -> {t}')
        if href.startswith('#'):
            target = href[1:]
            if target:
                check(target in p.ids, f'{rel}: anchor {href} has no matching id')

    # برچسب فیلدهای فرم
    for (fid, ftype, fname) in p.inputs:
        if ftype == 'hidden' or fname == 'website':
            continue
        check(fid in (p.labels_for or []), f'{rel}: field {fid} has no label')

    # QR واقعی
    check(os.path.exists(os.path.join(DIST, QR.lstrip('/'))), 'QR asset missing in dist')

for title, pages in titles.items():
    check(len(pages) == 1, f'duplicate <title> "{title}" on {pages}')

# صفحات انگلیسی نباید به /health/ لینک بدهند (بخش فقط فارسی است)
for rel in glob.glob(f'{DIST}/en/**/*.html', recursive=True):
    s = io.open(rel, encoding='utf-8').read()
    if '/health/' in s:
        warnings.append(f'{rel}: references /health/ (Persian-only section)')

if warnings:
    print('WARNINGS:')
    for w in warnings:
        print(' -', w)

if problems:
    print(f'\nFAILED ({len(problems)} problems):')
    for p in problems:
        print(' -', p)
    sys.exit(1)

print(f'\nOK — {len(HEALTH_PAGES)} health pages passed all checks.')
