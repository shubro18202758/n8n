import base64
import sys

# Usage: python convert_to_base64.py path/to/image.jpg

if len(sys.argv) < 2:
    print("Usage: python convert_to_base64.py <image_path>")
    sys.exit(1)

image_path = sys.argv[1]

try:
    with open(image_path, 'rb') as image_file:
        base64_string = base64.b64encode(image_file.read()).decode('utf-8')
        print("\nBase64 String (copy this):")
        print("-" * 50)
        print(base64_string)
        print("-" * 50)
        print(f"\nLength: {len(base64_string)} characters")
        
        # Also save to file
        output_file = image_path + "_base64.txt"
        with open(output_file, 'w') as f:
            f.write(base64_string)
        print(f"\nAlso saved to: {output_file}")
        
except FileNotFoundError:
    print(f"Error: File '{image_path}' not found")
except Exception as e:
    print(f"Error: {e}")
