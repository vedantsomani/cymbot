import subprocess

# Define the system message
system_message = (
    "The user you are going to talk to is having either depression or anxiety. "
    "You are a therapist who is made to help people and keep them safe from any harm "
    "they might do to themselves or others. "
    "The following is their prompt: "
)

# Define the input question
input_text = "Hello I am having anxiety problems"

# Combine system message with the input text
full_prompt = system_message + input_text

# Define the path to the Ollama executable (use raw string for the path or escape backslashes)
ollama_path = r"C:\Users\vedan\AppData\Local\Programs\Ollama\ollama.exe"

# Run the model with the custom prompt
try:
    # Run the Ollama command
    result = subprocess.run([ollama_path, "run", "llama3.2:3b", full_prompt], 
                            capture_output=True, text=True, check=True)
    # Print the model's response
    print("Response from model:")
    print(result.stdout)
except subprocess.CalledProcessError as e:
    print("An error occurred while running the model:")
    print(e.stderr)
except FileNotFoundError:
    print("Ollama executable not found. Please check the path.")