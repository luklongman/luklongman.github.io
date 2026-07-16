
### **Part 1: Fundamentals of Space and The IEM Suite**

_The first month establishes the physics of 3D audio and hands-on DAW workflows using the open-source IEM Plugin Suite._

- **Week 1: Psychoacoustics and the Spatial Canvas**
    
    - **Topics:** How humans localize sound (ITD, ILD, HRTFs). Introduction to channel-based vs. object-based vs. scene-based audio.
        
    - **Lab:** Setting up a monitoring environment. Introduction to AmbiX formats and channel ordering (ACN/SN3D).
        
- **Week 2: Introduction to Higher-Order Ambisonics (HOA)**
    
    - **Topics:** The mathematics of spherical harmonics. Capturing sound fields vs. synthesizing them.
        
    - **Lab:** Installing the IEM Plugin Suite. Using the _StereoEncoder_ and _MultiEncoder_ to place virtual sources within a 3rd-order or 5th-order Ambisonic sphere in the DAW.
        
- **Week 3: Decoding and Speaker Arrays**
    
    - **Topics:** Translating the Ambisonic sphere to physical reality. Binaural rendering for headphones vs. decoding to multi-channel physical arrays.
        
    - **Lab:** Using the IEM _BinauralDecoder_ and _SimpleDecoder_. Calculating 3D speaker coordinate allocations for custom physical studio layouts or dome arrays.
        
- **Week 4: Trajectories, Automation, and Acoustic Simulation**
    
    - **Topics:** Moving sound through space over time. Distance attenuation and Doppler effects.
        
    - **Lab:** Automating azimuth and elevation parameters. Simulating physical room early reflections and reverb tails using IEM’s _RoomEncoder_.
        

### **Part 2: Max/MSP for Custom Spatial Control**

_The second month shifts from DAW timeline automation to generative, algorithmic, and interactive spatial control using Max/MSP._

- **Week 5: Audio Routing and Max Fundamentals**
    
    - **Topics:** Signal flow, matrix routing, and building foundational audio interfaces in Max.
        
    - **Lab:** Constructing a basic multi-channel panner from scratch. Managing data types (handling integers and avoiding UI element lockups, ensuring parameter boxes don't freeze on value inputs).
        
- **Week 6: Algorithmic Movement and Sequencing**
    
    - **Topics:** Using math and logic operators to generate organic spatial trajectories (LFOs, random walks, particle systems).
        
    - **Lab:** Building a spatial sequencer. Structuring logic gates with `[select]` to trigger spatial events, and carefully managing control flow (e.g., ensuring standard parameters or integer inputs correctly reset internal loop counts in `[counter]` objects).
        
- **Week 7: Networked Control and OSC (Open Sound Control)**
    
    - **Topics:** Decoupling the audio engine from the control interface. The structure of OSC messages.
        
    - **Lab:** Writing OSC tracking scripts to send real-time telemetry from Max to the IEM plugins (or to external signal engines like SPAT Revolution).
        
- **Week 8: Advanced Max for Live Integration**
    
    - **Topics:** Bridging custom Max patches with Ableton Live's API for spatial manipulation.
        
    - **Lab:** Designing cross-track fader modulations. Identifying and engineering workarounds for Live Object Model API feedback loops and blockages that occur when mapping standard devices across multiple spatial tracks.
        

### **Part 3: Interdisciplinary Systems and Final Deployment**

_The final month focuses on expanding the system into external frameworks, hardware, and physical space._

- **Week 9: Visualizing Spatial Data**
    
    - **Topics:** Translating audio data into visual representations for performance feedback or installation aesthetics.
        
    - **Lab:** Streaming real-time parameter telemetry via WebSockets into web-native graphics pipelines (utilizing JavaScript frameworks, WebGPU, or Max’s Jitter environment) to create corresponding visual multi-channel meters.
        
- **Week 10: Hardware Interfaces and Physical Sensors**
    
    - **Topics:** Tactile control of spatial audio.
        
    - **Lab:** Translating MIDI-to-system keystrokes or using external microcontrollers (e.g., ESP32, Arduino) to send spatial coordinates via OSC, allowing physical sensors to dynamically move sound in the Ambisonic field.
        
- **Week 11: Installation Architecture and System Optimization**
    
    - **Topics:** Moving from a single computer to a deployed installation.
        
    - **Lab:** Managing multi-machine audio routing. Troubleshooting local audio path stream latency bottlenecks and ensuring stable network performance for dense audio data.
        
- **Week 12: Final Project Presentations**
    
    - **Topics:** Live demonstration of a fully integrated spatial piece.
        
    - **Requirement:** Students present an original composition or interactive installation, showcasing a custom Max/MSP control system driving an Ambisonic mix via the IEM suite, routed either binaurally or to a multi-speaker array.