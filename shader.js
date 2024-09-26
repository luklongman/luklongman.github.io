const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

// Vertex shader (pass through)
const vertexShaderSource = `
    attribute vec4 a_position;
    void main() {
        gl_Position = a_position;
    }
`;

// Fragment shader (your GLSL code here)
const fragmentShaderSource = `
    precision mediump float;

    uniform vec2 iResolution;
    uniform float iTime;

    // Your GLSL functions and code
    float BiSmoothStep(float Center, float Distance, float UpperBlur, float LowerBlur, float Value) {
        float Sum = smoothstep(Center - Distance - LowerBlur, Center - Distance, Value);
        Sum *= smoothstep(Center + Distance + UpperBlur, Center + Distance, Value);
        return Sum;
    }

    const float NoteCount = 8.0;
    const float NoteSpacing = 1.0;
    const float NoteRoundness = 0.5;

    float SliderSDF(vec2 Point, float NoteSlider, float NoteTime) {
        float NoteLowerBlur = pow(1. - NoteTime, 7.) * .2;
        float NoteUpperBlur = pow(NoteTime, 7.) * .2;
        vec2 MinVec = vec2(-1. / NoteCount * NoteSpacing, NoteSlider - .5 + 1. / NoteCount * NoteRoundness - NoteLowerBlur);
        vec2 MaxVec = vec2(1. / NoteCount * NoteSpacing, NoteSlider - .5 - 1. / NoteCount * NoteRoundness + .1 + NoteUpperBlur);
        Point.x = mod(Point.x, 1. / NoteCount) - 1. / NoteCount * .5;
        return length(clamp(Point, MinVec, MaxVec) - Point) - 1. / NoteCount * NoteRoundness;
    }

    vec4 DrawSliders(vec2 uv) {
        float NoteIndex = NoteCount - floor((uv.x + .5) * NoteCount) - 1.;
        float NoteSpan = 180. / (8. - NoteIndex);
        float NoteTime = fract((iTime) / NoteSpan);
        float NoteSlider = pow(1. - (cos(NoteTime * 3.1415 * 2.) * .5 + .5), .375) * .9;
        float Note = SliderSDF(uv, NoteSlider, NoteTime);
        float NoteColor = smoothstep(max(pow(1. - NoteTime, 10.) * .05 / (pow(1. + NoteTime, 3.)), .001), 0., Note);
        return vec4(NoteColor * .8);
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        vec2 uv = (fragCoord - iResolution.xy * .5) / iResolution.y;
        vec4 Sliders = DrawSliders(uv);
        fragColor = vec4(Sliders.rgb, 1.0);
    }

    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`;

// Helper functions for shader compilation
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program', gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}

// Initialize shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// Look up uniform locations
const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
const iTimeLocation = gl.getUniformLocation(program, 'iTime');

// Look up attribute location
const positionLocation = gl.getAttribLocation(program, 'a_position');

// Create a buffer for the square's positions
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Define positions for a square
const positions = [
    -1, -1,
     1, -1,
    -1,  1,
     1,  1,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// Render the scene
function render(time) {
    time *= 0.001;  // Convert to seconds

    // Resize canvas to display size
    gl.canvas.width = window.innerWidth;
    gl.canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use our program
    gl.useProgram(program);

    // Enable the position attribute
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set the uniforms
    gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(iTimeLocation, time);

    // Draw the square
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Request animation frame for the next draw
    requestAnimationFrame(render);
}

// Start rendering
requestAnimationFrame(render);