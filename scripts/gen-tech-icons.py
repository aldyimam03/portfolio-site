import urllib.request, re, time

SLUGS = ['laravel','php','webpack','inertia','react','typescript','tailwindcss','postgresql',
         'redis','docker','rabbitmq','axios','bootstrap','sass','nodedotjs','express','mysql',
         'jsonwebtokens','sequelize','sqlite','jest','vite','html5','git','github','claude']
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'}

entries = []
for s in SLUGS:
    req = urllib.request.Request('https://cdn.simpleicons.org/' + s, headers=UA)
    body = urllib.request.urlopen(req, timeout=25).read().decode()
    hexv = re.search(r'fill="(#[0-9A-Fa-f]{6})"', body).group(1)
    d = ' '.join(re.findall(r'<path[^>]*\sd="([^"]+)"', body))
    assert "'" not in d, s
    assert chr(92) not in d, s
    entries.append((s, hexv, d))
    time.sleep(0.1)

lines = [
    '// Data ikon dari Simple Icons (lisensi CC0 1.0) — https://simpleicons.org',
    '// Di-generate sekali lalu di-render inline sebagai <path>, tanpa request ke CDN.',
    '',
    'export type TechPath = { hex: string; d: string }',
    '',
    'export const TECH_PATHS: Record<string, TechPath> = {',
]
for s, hexv, d in entries:
    lines.append("  " + s + ": { hex: '" + hexv + "', d: '" + d + "' },")
lines += ['}', '']
src = '\n'.join(lines)
with open('src/components/tech-icons.ts', 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
print('ikon:', len(entries), '| ukuran file:', len(src), 'byte')
