import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Helper function for smooth interpolation
def smoothstep(x):
    return x * x * (3 - 2 * x)

# Hash function to create pseudo-random values
def hash3(p):
    p_dot = np.dot(p, np.array([1.0, 57.0, -13.7]))
    return np.mod(np.sin(1e3 * p_dot) * 4375.5453, 1.0)

# Trilinear interpolation based noise function
def noise3(x):
    p = np.floor(x)
    f = x - p  # fract(x)
    f = smoothstep(f)  # Smooth the fractional part

    def hash_grid_offset(dx, dy, dz):
        return hash3(p + np.array([dx, dy, dz]))

    # Perform the trilinear interpolation
    n000 = hash_grid_offset(0, 0, 0)
    n100 = hash_grid_offset(1, 0, 0)
    n010 = hash_grid_offset(0, 1, 0)
    n110 = hash_grid_offset(1, 1, 0)
    n001 = hash_grid_offset(0, 0, 1)
    n101 = hash_grid_offset(1, 0, 1)
    n011 = hash_grid_offset(0, 1, 1)
    n111 = hash_grid_offset(1, 1, 1)

    nx00 = np.interp(f[0], [0, 1], [n000, n100])
    nx01 = np.interp(f[0], [0, 1], [n001, n101])
    nx10 = np.interp(f[0], [0, 1], [n010, n110])
    nx11 = np.interp(f[0], [0, 1], [n011, n111])

    nxy0 = np.interp(f[1], [0, 1], [nx00, nx10])
    nxy1 = np.interp(f[1], [0, 1], [nx01, nx11])

    return np.interp(f[2], [0, 1], [nxy0, nxy1])

# Noise improvement idea (two noise functions averaged)
def noise(x):
    return (noise3(x) + noise3(x + 11.5)) / 2

# Main rendering function (simulating the `mainImage` function)
def render_image(resolution, time):
    img = np.zeros((resolution[1], resolution[0], 3))
    
    for y in range(resolution[1]):
        for x in range(resolution[0]):
            U = np.array([x / resolution[0], y / resolution[1]])
            noise_value = noise(np.array([U[0] * 8.0, U[1] * 8.0, 0.1 * time]))
            
            # Compute v using sin function as in GLSL code
            v = np.sin(6.28 * 10.0 * noise_value)
            v = np.abs(v) * 0.5
            v = np.clip(v, 0.0, 1.0)  # Smoothstep equivalent
            
            # Assign some color based on noise
            img[y, x, :] = np.array([v, 0.5 + 0.5 * np.sin(12 * noise_value), v])
    
    return img

# Parameters
resolution = (256, 256)  # Set smaller resolution for faster animation

# Set up the plot
fig, ax = plt.subplots()
img_display = ax.imshow(np.zeros((resolution[1], resolution[0], 3)), animated=True)
ax.set_title("Procedural Pseudo-Perlin Noise Animation")
ax.axis('off')

# Update function for animation
def update(frame):
    time = frame * 0.05  # Increment time gradually for each frame
    img = render_image(resolution, time)
    img_display.set_array(img)
    return [img_display]

# Create the animation
ani = FuncAnimation(fig, update, frames=100, interval=50, blit=True)

# Display the animation
plt.show()