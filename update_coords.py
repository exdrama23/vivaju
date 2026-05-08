import re

# Central coordinates
central_lat = -10.91058576633602
central_lon = -37.05137269380025

# Generate unique small offsets for each store
lat_offsets = [-0.0045, -0.0035, -0.0025, -0.0015, -0.0005, 0.0005, 0.0015, 0.0025, 0.0035, 0.0045, 
               -0.004, -0.003, -0.002, -0.001, 0, 0.001, 0.002, 0.003, 0.004, -0.00375, -0.00275, 
               -0.00175, -0.00075, 0.00025, 0.00125, 0.00225, 0.00325, 0.00425, -0.00425, -0.00325, 
               -0.00225, -0.00125]

lon_offsets = [-0.004, -0.003, -0.002, -0.001, 0, 0.001, 0.002, 0.003, 0.004, 0.0045, 0.0035, 0.0025, 
               0.0015, 0.0005, -0.0005, -0.0015, -0.0025, -0.0035, -0.0045, -0.00375, -0.00275, -0.00175, 
               -0.00075, 0.00025, 0.00125, 0.00225, 0.00325, 0.00425, -0.00425, -0.00325, -0.00225, -0.00125]

# Read the file
with open(r'c:\Users\pc_ac\OneDrive\Desktop\vivaju\frontend\src\services\mockData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Update coordinates for each store
for i in range(32):
    store_id = i + 1
    new_lat = central_lat + lat_offsets[i]
    new_lon = central_lon + lon_offsets[i]
    
    # Replace each store's latitude and longitude
    pattern = rf'(id: "c{store_id}",.*?latitude: )-?[\d.]+,'
    replacement = rf'\g<1>{new_lat},'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    pattern = rf'(id: "c{store_id}",.*?longitude: )-?[\d.]+,'
    replacement = rf'\g<1>{new_lon},'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write the file back
with open(r'c:\Users\pc_ac\OneDrive\Desktop\vivaju\frontend\src\services\mockData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Coordinates updated successfully!")
