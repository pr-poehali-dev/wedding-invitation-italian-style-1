"""Отправка анкеты гостя на email невесты"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '—')
    presence = body.get('presence', '—')
    drinks = ', '.join(body.get('drinks', [])) or '—'
    wishes = body.get('wishes', '—')

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    sender = 'polina.shashel@gmail.com'
    recipient = 'polina.shashel@gmail.com'

    html = f"""
    <html><body style="font-family: Georgia, serif; color: #1a1a1a; padding: 24px; max-width: 600px;">
      <h2 style="color: #4A7BB5; font-style: italic;">🍋 Новая анкета гостя</h2>
      <hr style="border: 1px solid #ddeaf7; margin: 16px 0;">
      <p><b>Имя и фамилия:</b> {name}</p>
      <p><b>Присутствие:</b> {presence}</p>
      <p><b>Напитки:</b> {drinks}</p>
      <p><b>Пожелания:</b><br>{wishes}</p>
      <hr style="border: 1px solid #ddeaf7; margin: 16px 0;">
      <p style="color: #888; font-size: 13px;">Свадьба Эдуарда и Полины · 26 мая 2026</p>
    </body></html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Анкета гостя: {name}'
    msg['From'] = sender
    msg['To'] = recipient
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'ok': True}),
    }
