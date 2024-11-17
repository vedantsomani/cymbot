
from flask import Flask, request, jsonify

app = Flask(__name__)

USER_DATA_FILE = "users.txt"

def verify_user(username, entered_code):
    lines = []
    with open(USER_DATA_FILE, "r") as file:
        lines = file.readlines()

    with open(USER_DATA_FILE, "w") as file:
        for line in lines:
            saved_username, saved_password, saved_email, saved_code = line.strip().split(',')
            if username == saved_username:
                if entered_code == saved_code:
                    file.write(f"{saved_username},{saved_password},{saved_email},verified\n")
                    return {"status": "success", "message": "Account verified successfully!"}
                else:
                    file.write(line)
                    return {"status": "error", "message": "Incorrect verification code."}
            else:
                file.write(line)
    return {"status": "error", "message": "User not found."}

@app.route('/verify', methods=['POST'])
def verify():
    data = request.json
    username = data.get('username')
    verification_code = data.get('verification_code')
    result = verify_user(username, verification_code)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

