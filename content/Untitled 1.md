### Keywords

  

- Generative Music
    
- I-Ching (Book of Changes)
    
- DNA
    
- Sonification
### Questions

- Briefly describe it.
    

- A generative music piece driven by the DNA sonification.
    
- Both DNA Codons and I-Ching hexagrams have a count of 64 and can be expressed in a 6-bit binary number.
    
- A DNA Codon is a combination of any 3 nucleotides out of 4 (ie AAA, CGT, etc). Given C=00; G=11; A=10; T=01, CCT = 000001;
    
- Why is it mapped this way?
    

- [database-stats](https://docs.google.com/spreadsheets/d/1YtstqVezKAwyHeba9NgSSZuthuIoC-7_Bssozt0GDWE/edit?gid=1686983714#gid=1686983714)
    
- Mapping methodology inconsistency. To be reviewed.
    

- Each of the 64 codons is mapped to one of the 64 I-Ching hexagram and one musical note.
    

- What is the?
    

-   
    

- What do we have in the database?
    

- Total codons    13,812,436
    
- Total sequences    77,834
    
- Unique codons    64
    

- How do you map DNA codons to I-Ching Hexagram?
    

-   
    

- How do you assign them to musical notes?
    
- Consulting the I Ching
    
- Discovering in-depth relationships among the hexagrams, in both cultural and mathematical terms.
    

-  否極泰來. ䷋否卦 and ䷊泰卦 can either be seen as the binary complement OR 180 degree rotation (倒卦, 錯卦) of each other;
    
- 剝極必復. ䷖ 剝卦 and ䷗ 復卦
    

- How do you create a musical sequence out of one codon?

## Technical Notes (20260502)

Tempo - Scene based

Rhythm - Clip based

Note - 

Key/Mode - Clip based (Random/ Define)

DNA Sequencer Flow = MIDI FX RACK -> INST RACK -> AUDIO FX RACK

MIDI FX RACK - Replaced with custom M4L (Specification TBC)

INST RACK - Clip based (Pick instrument)

Extra Question: What about Choir (Follow Key/ Mode), Clip based (stack and length), How often does it appear?

AUDIO FX RACK - 

How many effect to pick

What Macro Control should exist

Max: 1 Macro Variations per Hexagram.

Trigger by Clphyx pro x-clips ([]DEV VAR RECALL 1/?)

Morphing too [] "MyRack" SNAP RECALL 2 4s

## 