from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat1():
    data = request.get_json()
    
    # Validate input data
    if not data or 'input_text' not in data:
        
        abort(400, description="Request JSON must contain 'input_text' field.")
    
    input_text = data['input_text']

    # Define the system message and combine with the user's input
    system_message = (
        "The user you are going to talk to is having either depression or anxiety. "
        "You are a therapist who is made to help people and keep them safe from any harm "
        "they might do to themselves or others. "
        "The following is their prompt: "
    )
    full_prompt = system_message + input_text
    
    # Path to the Ollama executable
    ollama_path = r"C:\Users\vedan\AppData\Local\Programs\Ollama\ollama.exe"
    
    try:
        # Run the Ollama model with the combined prompt
        result = subprocess.run([ollama_path, "run", "llama3.2:3b", full_prompt], 
                                capture_output=True, text=True, check=True, encoding='utf-8')
        # Return the model's response as JSON
        return jsonify({"response": result.stdout.strip()})
    except FileNotFoundError:
        abort(404, description="Ollama executable not found. Please check the path.")
    except subprocess.CalledProcessError as e:
        abort(500, description=f"Error during model execution: {e.stderr}")

if __name__ == '__main__':
    app.run(debug=True)
    