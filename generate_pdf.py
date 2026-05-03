#!/usr/bin/env python3
"""Genereer een PDF met de definitieve moestuin-indeling Vogelenzang 2026."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import Color, HexColor, white, black
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER

PAGE_W, PAGE_H = A4

RIJEN = [
    (1, 'Aardbei', 'Aardbei'),
    (2, 'Vrucht', 'Vrucht'),
    (3, 'Vrucht', 'Vrucht'),
    (4, 'Vrucht', 'Vrucht'),
    (5, 'Wortel', 'Wortel'),
    (6, 'Aardappel', 'Aardappel'),
    (7, 'Bonen', 'Bonen'),
    (8, 'Bloemen', 'Bonen'),
    (9, 'Kolen', 'Kolen'),
    (10, 'Blad', 'Blad'),
]

KLEUREN = {
    'Aardbei':   HexColor('#E53935'),
    'Vrucht':    HexColor('#E8A838'),
    'Wortel':    HexColor('#D4649A'),
    'Aardappel': HexColor('#5B8BD4'),
    'Bonen':     HexColor('#4CAF50'),
    'Kolen':     HexColor('#2E7D32'),
    'Blad':      HexColor('#26A69A'),
    'Bloemen':   HexColor('#BA68C8'),
    'Bessen':    HexColor('#7B1FA2'),
}

TEKST_WIT = {'Kolen'}
GROEN = HexColor('#2E7D32')
LICHTGROEN_BG = HexColor('#F0F7EC')
PAD_KLEUR = HexColor('#C8B990')
PAD_RAND = HexColor('#B4A57A')


def darken(hex_color, factor=0.8):
    r = int(hex_color.red * 255 * factor)
    g = int(hex_color.green * 255 * factor)
    b = int(hex_color.blue * 255 * factor)
    return Color(r / 255, g / 255, b / 255)


def draw_rounded_rect(c, x, y, w, h, radius, fill_color, stroke_color=None):
    c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(0.5)
        c.roundRect(x, y, w, h, radius, fill=1, stroke=1)
    else:
        c.roundRect(x, y, w, h, radius, fill=1, stroke=0)


def create_pdf():
    output_path = '/home/user/moestuin/moestuin-indeling-2026.pdf'
    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle('Moestuin Vogelenzang - Indeling 2026')
    c.setAuthor('Moestuin Vogelenzang')

    margin = 25 * mm
    content_w = PAGE_W - 2 * margin

    # --- Title ---
    y = PAGE_H - 25 * mm
    c.setFont('Helvetica-Bold', 22)
    c.setFillColor(GROEN)
    c.drawCentredString(PAGE_W / 2, y, 'Moestuin Vogelenzang 2026')

    y -= 5 * mm
    c.setFont('Helvetica', 8)
    c.setFillColor(HexColor('#999999'))
    c.drawCentredString(PAGE_W / 2, y, 'Zandgrond  •  Kustklimaat  •  Zone 8b')

    # --- Garden map ---
    bed_w = 48 * mm
    pad_w = 12 * mm
    rij_h = 11 * mm
    gap = 1.5 * mm
    bessen_w = 16 * mm
    bessen_gap = 4 * mm
    total_w = bed_w * 2 + pad_w + bessen_gap + bessen_w
    start_x = (PAGE_W - total_w) / 2
    y -= 8 * mm

    # "Bloemen kant" label
    c.setFont('Helvetica-Oblique', 8)
    c.setFillColor(HexColor('#AAAAAA'))
    c.drawCentredString(PAGE_W / 2, y, '↑  Bloemen kant')
    y -= 3.5 * mm

    y -= 1 * mm

    # Draw rows (top to bottom)
    for i, (rij_nr, links, rechts) in enumerate(RIJEN):
        row_y = y - (i + 1) * (rij_h + gap)

        # Row number
        c.setFont('Helvetica', 8)
        c.setFillColor(HexColor('#BBBBBB'))
        c.drawRightString(start_x - 3 * mm, row_y + rij_h / 2 - 1.5 * mm, str(rij_nr))

        # Left bed
        kleur = KLEUREN[links]
        draw_rounded_rect(c, start_x, row_y, bed_w, rij_h, 2 * mm, kleur, darken(kleur, 0.7))
        c.setFont('Helvetica-Bold', 11)
        c.setFillColor(white if links in TEKST_WIT else HexColor('#3A2510'))
        c.drawCentredString(start_x + bed_w / 2, row_y + rij_h / 2 - 1.5 * mm, links)

        # Path
        draw_rounded_rect(c, start_x + bed_w, row_y, pad_w, rij_h, 1 * mm, PAD_KLEUR, PAD_RAND)
        if i == 4:
            c.setFont('Helvetica', 6)
            c.setFillColor(HexColor('#8A7A5A'))
            c.drawCentredString(start_x + bed_w + pad_w / 2, row_y + rij_h / 2 - 1.5 * mm, 'pad')

        # Right bed
        kleur = KLEUREN[rechts]
        draw_rounded_rect(c, start_x + bed_w + pad_w, row_y, bed_w, rij_h, 2 * mm, kleur, darken(kleur, 0.7))
        c.setFont('Helvetica-Bold', 11)
        c.setFillColor(white if rechts in TEKST_WIT else HexColor('#3A2510'))
        c.drawCentredString(start_x + bed_w + pad_w + bed_w / 2, row_y + rij_h / 2 - 1.5 * mm, rechts)

    # Frambozen & bessen strip on the right
    bessen_x = start_x + bed_w * 2 + pad_w + bessen_gap
    bessen_top = y - (rij_h + gap)
    bessen_bottom = y - len(RIJEN) * (rij_h + gap)
    bessen_h = bessen_top - bessen_bottom + rij_h
    bessen_color = HexColor('#7B1FA2')
    draw_rounded_rect(c, bessen_x, bessen_bottom, bessen_w, bessen_h, 2 * mm, bessen_color, darken(bessen_color, 0.7))

    # Vertical text for bessen
    c.saveState()
    c.setFillColor(white)
    c.setFont('Helvetica-Bold', 9)
    c.translate(bessen_x + bessen_w / 2 + 1 * mm, bessen_bottom + bessen_h / 2)
    c.rotate(90)
    c.drawCentredString(0, 0, 'Frambozen & bessen')
    c.restoreState()

    # Arrow on left side
    arrow_x = start_x - 10 * mm
    arrow_top = y - (rij_h + gap) + rij_h / 2
    arrow_bottom = y - len(RIJEN) * (rij_h + gap) + rij_h / 2
    c.setStrokeColor(HexColor('#CCCCCC'))
    c.setLineWidth(1)
    c.line(arrow_x, arrow_top, arrow_x, arrow_bottom)
    c.line(arrow_x, arrow_bottom, arrow_x - 2 * mm, arrow_bottom + 4 * mm)
    c.line(arrow_x, arrow_bottom, arrow_x + 2 * mm, arrow_bottom + 4 * mm)

    # "Sloot kant" label
    sloot_y = y - len(RIJEN) * (rij_h + gap) - 3 * mm
    c.setFont('Helvetica-Oblique', 9)
    c.setFillColor(HexColor('#3A8FD4'))
    c.drawCentredString(PAGE_W / 2, sloot_y, '↓  Sloot kant')

    # --- Rotation note ---
    note_h = 18 * mm
    note_y = sloot_y - note_h - 4 * mm
    draw_rounded_rect(c, margin, note_y, content_w, note_h, 3 * mm, LICHTGROEN_BG, HexColor('#C8E0BA'))

    c.setFont('Helvetica-Bold', 9)
    c.setFillColor(GROEN)
    c.drawString(margin + 4 * mm, note_y + note_h - 5 * mm, 'Gewasrotatie')

    c.setFont('Helvetica', 8)
    c.setFillColor(HexColor('#555555'))
    text = (
        'Elk jaar schuiven de gewassen een rij op richting de sloot. '
        'De aardbeien en bloemen zijn vaste bedden en roteren niet mee. '
        'Door te roteren voorkom je bodemziekten en benut je voedingsstoffen optimaal.'
    )
    text_obj = c.beginText(margin + 4 * mm, note_y + note_h - 10 * mm)
    text_obj.setFont('Helvetica', 8)
    text_obj.setFillColor(HexColor('#555555'))

    words = text.split()
    line = ''
    max_line_w = content_w - 8 * mm
    for word in words:
        test = line + ' ' + word if line else word
        if c.stringWidth(test, 'Helvetica', 8) < max_line_w:
            line = test
        else:
            text_obj.textLine(line)
            line = word
    if line:
        text_obj.textLine(line)
    c.drawText(text_obj)

    # --- "Wat zit er in elk bed?" ---
    info_y = note_y - 12 * mm
    c.setFont('Helvetica-Bold', 10)
    c.setFillColor(GROEN)
    c.drawString(margin, info_y, 'Wat zit er in elk bed?')

    info_y -= 7 * mm
    gewassen = [
        ('Aardbei', 'Aardbeien (vast bed, vernieuw na 3-4 jaar)'),
        ('Vrucht', 'Tomaten, courgettes, pompoenen, komkommers'),
        ('Wortel', 'Wortelen, pastinaken, rode biet, radijs, knolselderij'),
        ('Aardappel', 'Vroege en bewaaraardappelen'),
        ('Bonen', 'Stokbonen, pronkbonen, peultjes, doperwten, sperziebonen, tuinbonen'),
        ('Kolen', 'Boerenkool, broccoli, bloemkool, spruitjes, rode kool, koolrabi'),
        ('Blad', 'Kropsla, pluksla, rucola, spinazie, snijbiet, raapstelen, veldsla'),
        ('Bloemen', 'Bloemen (vast bed)'),
        ('Bessen', 'Frambozen, aalbes, blauwe bessen, zwarte bessen'),
    ]

    for idx, (naam, omschrijving) in enumerate(gewassen):
        iy = info_y - idx * 5.5 * mm
        kleur = KLEUREN[naam]
        draw_rounded_rect(c, margin, iy - 0.5 * mm, 4 * mm, 4 * mm, 1 * mm, kleur, darken(kleur, 0.7))

        c.setFont('Helvetica-Bold', 8.5)
        c.setFillColor(HexColor('#444444'))
        c.drawString(margin + 6 * mm, iy, naam)

        c.setFont('Helvetica', 8.5)
        c.setFillColor(HexColor('#777777'))
        c.drawString(margin + 28 * mm, iy, omschrijving)

    # Footer
    c.setFont('Helvetica-Oblique', 7)
    c.setFillColor(HexColor('#BBBBBB'))
    c.drawCentredString(PAGE_W / 2, 12 * mm, 'Moestuin Vogelenzang • Seizoen 2026')

    c.save()
    print(f'PDF opgeslagen: {output_path}')


if __name__ == '__main__':
    create_pdf()
