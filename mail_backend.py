from flask import Flask, request, jsonify`nfrom config import Config
from flask_mail import Mail, Message

app = Flask(__name__)

# Configure your mail server (example: Gmail SMTP)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'm.sahimuzzaman@gmail.com'         # <-- Your email
app.config['MAIL_PASSWORD'] = 'your_app_password'                # <-- App password, not your real password!
app.config['MAIL_DEFAULT_SENDER'] = 'm.sahimuzzaman@gmail.com'   # <-- Your email

mail = Mail(app)

@app.route('/send-mail', methods=['POST'])
def send_mail():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'success': False, 'error': 'All fields are required.'}), 400

    try:
        msg = Message(
            subject=f"Portfolio Contact from {name}",
            recipients=[app.config['MAIL_USERNAME']],
            body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        )
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Email sent successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 
