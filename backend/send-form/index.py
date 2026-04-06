"""Отправка анкеты гостя на email невесты + красивое письмо-благодарность гостю"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


GUEST_THANK_YOU_HTML = """<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Эдуард и Полина · 26 мая 2026</title>
</head>
<body style="margin:0;padding:0;background:#FEFDE8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FEFDE8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:2px;overflow:hidden;box-shadow:0 4px 32px rgba(43,95,165,0.10);">

        <!-- Шапка с лимонами -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#3A78B5 0%,#2860A0 100%);padding:48px 40px 32px;">
            <img
              src="https://cdn.poehali.dev/projects/00026160-0537-4715-a8aa-39785d3a60b5/bucket/6786efd6-5b1b-441f-abe5-0ab86c6821b5.png"
              alt="лимоны"
              width="160"
              style="display:block;margin:0 auto 24px;"
            />
            <p style="margin:0 0 6px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">
              26 МАЯ 2026 · ИРКУТСК
            </p>
            <h1 style="margin:0;color:#fff;font-size:40px;font-weight:400;font-style:italic;line-height:1.2;letter-spacing:0.01em;">
              Эдуард &amp; Полина
            </h1>
          </td>
        </tr>

        <!-- Основное сообщение -->
        <tr>
          <td align="center" style="padding:48px 48px 32px;">
            <p style="margin:0 0 8px;color:#D4A017;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;font-family:Arial,sans-serif;">
              GRAZIE MILLE
            </p>
            <h2 style="margin:0 0 24px;color:#2860A0;font-size:32px;font-weight:400;font-style:italic;">
              Спасибо за ответ!
            </h2>

            <!-- Разделитель -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="height:1px;background:linear-gradient(to right,transparent,#ddeaf7,transparent);"></td>
              </tr>
            </table>

            <p style="margin:0 0 20px;color:#3a3a3a;font-size:18px;line-height:1.8;">
              Дорогой гость,<br>
              мы получили твои ответы<br>и очень рады, что ты с нами!
            </p>
            <p style="margin:0 0 28px;color:#5a6070;font-size:15px;line-height:1.8;font-family:Arial,sans-serif;">
              Мы ждём тебя <strong style="color:#2860A0;">26 мая 2026 года</strong><br>
              в Иркутске, на нашем итальянском торжестве.<br>
              Будет вкусно, душевно и незабываемо!
            </p>

            <!-- Разделитель -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="height:1px;background:linear-gradient(to right,transparent,#ddeaf7,transparent);"></td>
              </tr>
            </table>

            <!-- Детали дня -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding:16px;text-align:center;border-right:1px solid #f0f4fa;">
                  <p style="margin:0 0 4px;color:#D4A017;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">РЕГИСТРАЦИЯ</p>
                  <p style="margin:0;color:#2860A0;font-size:22px;font-style:italic;">15:30</p>
                  <p style="margin:4px 0 0;color:#5a6070;font-size:13px;font-family:Arial,sans-serif;">Центральный ЗАГС</p>
                </td>
                <td width="50%" style="padding:16px;text-align:center;">
                  <p style="margin:0 0 4px;color:#D4A017;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">БАНКЕТ</p>
                  <p style="margin:0;color:#2860A0;font-size:22px;font-style:italic;">17:30</p>
                  <p style="margin:4px 0 0;color:#5a6070;font-size:13px;font-family:Arial,sans-serif;">рп. Большая Речка</p>
                </td>
              </tr>
            </table>

            <!-- Разделитель -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
              <tr>
                <td style="height:1px;background:linear-gradient(to right,transparent,#ddeaf7,transparent);"></td>
              </tr>
            </table>

            <p style="margin:0 0 8px;color:#3a3a3a;font-size:16px;line-height:1.7;">
              Если возникнут вопросы — пиши нам:
            </p>
            <p style="margin:0;font-size:15px;font-family:Arial,sans-serif;">
              <a href="tel:+79041381591" style="color:#2860A0;text-decoration:none;">Эдуард: +7 (904) 138-15-91</a><br>
              <a href="tel:+79041141320" style="color:#2860A0;text-decoration:none;">Полина: +7 (904) 114-13-20</a>
            </p>
          </td>
        </tr>

        <!-- Подвал -->
        <tr>
          <td align="center" style="background:#2860A0;padding:32px 40px;">
            <p style="margin:0 0 6px;color:#D4A017;font-size:20px;font-style:italic;">
              La Dolce Vita
            </p>
            <p style="margin:0;color:rgba(255,255,255,0.5);font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-family:Arial,sans-serif;">
              Эдуард &amp; Полина · 26.05.2026
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""


ADMIN_HTML_TEMPLATE = """<html>
<body style="font-family:Georgia,serif;color:#1a1a1a;padding:24px;max-width:600px;">
  <h2 style="color:#2860A0;font-style:italic;">🍋 Новая анкета гостя</h2>
  <hr style="border:none;border-top:1px solid #ddeaf7;margin:16px 0;">
  <p><b>Имя и фамилия:</b> {name}</p>
  <p><b>Присутствие:</b> {presence}</p>
  <p><b>Напитки:</b> {drinks}</p>
  <p><b>Пожелания:</b><br>{wishes}</p>
  <hr style="border:none;border-top:1px solid #ddeaf7;margin:16px 0;">
  <p style="color:#888;font-size:13px;">Свадьба Эдуарда и Полины · 26 мая 2026</p>
</body>
</html>"""


def send_email(smtp_password, from_addr, to_addr, subject, html):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = from_addr
    msg['To'] = to_addr
    msg.attach(MIMEText(html, 'html', 'utf-8'))
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(from_addr, smtp_password)
        server.sendmail(from_addr, to_addr, msg.as_string())


def handler(event: dict, context) -> dict:
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '—')
    presence = body.get('presence', '—')
    drinks = ', '.join(body.get('drinks', [])) or '—'
    wishes = body.get('wishes', '—')
    guest_email = body.get('email', '')

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    wedding_email = 'polina.shashel@gmail.com'

    # Письмо организаторам
    admin_html = ADMIN_HTML_TEMPLATE.format(
        name=name, presence=presence, drinks=drinks, wishes=wishes
    )
    send_email(smtp_password, wedding_email, wedding_email, f'Анкета гостя: {name}', admin_html)

    # Письмо-благодарность гостю (если указал email)
    if guest_email and '@' in guest_email:
        send_email(
            smtp_password,
            wedding_email,
            guest_email,
            'Эдуард и Полина ждут тебя · 26 мая 2026',
            GUEST_THANK_YOU_HTML,
        )

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True}),
    }
