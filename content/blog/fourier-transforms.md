---
title: "Fourier Transforms Explained"
date: "2026-02-02"
author: "Fabian"
excerpt: "An intuitive explanation of Fourier transforms, from basic concepts to practical applications in signal processing and beyond."
tags: ["mathematics", "signal-processing", "fourier"]
---

# Fourier Transforms Explained

The Fourier transform is one of the most powerful mathematical tools in science and engineering. It allows us to decompose complex signals into simpler frequency components, revealing hidden patterns and enabling sophisticated analysis.

## The Core Idea

Any periodic function can be represented as a sum of sine and cosine waves with different frequencies, amplitudes, and phases. This is the essence of Fourier analysis.

### Fourier Series

For a periodic function $f(x)$ with period $2\pi$, the Fourier series representation is:

$$
f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left( a_n \cos(nx) + b_n \sin(nx) \right)
$$

where the coefficients are:

$$
a_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \cos(nx) \, dx
$$

$$
b_n = \frac{1}{\pi} \int_{-\pi}^{\pi} f(x) \sin(nx) \, dx
$$

## The Fourier Transform

For non-periodic functions, we use the continuous Fourier transform:

$$
\mathcal{F}\{f(t)\} = F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} \, dt
$$

The inverse transform reconstructs the original function:

$$
\mathcal{F}^{-1}\{F(\omega)\} = f(t) = \frac{1}{2\pi} \int_{-\infty}^{\infty} F(\omega) e^{i\omega t} \, d\omega
$$

### Euler's Formula

The complex exponential in the Fourier transform comes from Euler's formula:

$$
e^{i\theta} = \cos(\theta) + i\sin(\theta)
$$

This elegant equation connects exponential functions with trigonometric functions, making the Fourier transform compact and beautiful.

## Discrete Fourier Transform (DFT)

In practice, we work with discrete samples. The DFT is:

$$
X_k = \sum_{n=0}^{N-1} x_n e^{-i 2\pi k n / N}
$$

for $k = 0, 1, \ldots, N-1$.

### Fast Fourier Transform (FFT)

The FFT is an efficient algorithm for computing the DFT, reducing complexity from $O(N^2)$ to $O(N \log N)$.

```python
import numpy as np

def simple_fft_example(signal, sample_rate):
    """
    Compute FFT of a signal and return frequencies and magnitudes
    """
    # Compute FFT
    fft_result = np.fft.fft(signal)
    
    # Compute frequencies
    frequencies = np.fft.fftfreq(len(signal), 1/sample_rate)
    
    # Compute magnitude spectrum
    magnitude = np.abs(fft_result)
    
    return frequencies, magnitude

# Example: Analyze a signal with two frequency components
sample_rate = 1000  # Hz
duration = 1.0  # seconds
t = np.linspace(0, duration, int(sample_rate * duration))

# Signal: 50 Hz + 120 Hz
signal = np.sin(2 * np.pi * 50 * t) + 0.5 * np.sin(2 * np.pi * 120 * t)

frequencies, magnitude = simple_fft_example(signal, sample_rate)
```

## Important Properties

### Linearity

$$
\mathcal{F}\{af(t) + bg(t)\} = a\mathcal{F}\{f(t)\} + b\mathcal{F}\{g(t)\}
$$

### Time Shifting

$$
\mathcal{F}\{f(t - t_0)\} = e^{-i\omega t_0} F(\omega)
$$

### Frequency Shifting

$$
\mathcal{F}\{e^{i\omega_0 t} f(t)\} = F(\omega - \omega_0)
$$

### Convolution Theorem

One of the most important properties:

$$
\mathcal{F}\{f * g\} = \mathcal{F}\{f\} \cdot \mathcal{F}\{g\}
$$

This means convolution in the time domain becomes multiplication in the frequency domain!

## Applications

### 1. Signal Processing

Fourier transforms are fundamental in:
- Audio compression (MP3, AAC)
- Image compression (JPEG)
- Noise filtering
- Feature extraction

### 2. Communications

- Modulation and demodulation
- Channel analysis
- Spectrum analysis

### 3. Image Processing

The 2D Fourier transform for images:

$$
F(u, v) = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} f(x, y) e^{-i2\pi(ux + vy)} \, dx \, dy
$$

Used in:
- Edge detection
- Image filtering
- Pattern recognition

### 4. Quantum Mechanics

The wave function in position and momentum space are related by Fourier transform:

$$
\psi(p) = \frac{1}{\sqrt{2\pi\hbar}} \int_{-\infty}^{\infty} \psi(x) e^{-ipx/\hbar} \, dx
$$

## Example: Frequency Analysis

```javascript
// Analyze audio frequency content
class FrequencyAnalyzer {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
  }
  
  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }
  
  getDominantFrequency() {
    const data = this.getFrequencyData();
    let maxIndex = 0;
    let maxValue = 0;
    
    for (let i = 0; i < data.length; i++) {
      if (data[i] > maxValue) {
        maxValue = data[i];
        maxIndex = i;
      }
    }
    
    // Convert bin index to frequency
    const nyquist = this.audioContext.sampleRate / 2;
    return (maxIndex * nyquist) / this.bufferLength;
  }
}
```

## Uncertainty Principle

The Fourier transform reveals a fundamental trade-off between time and frequency resolution:

$$
\Delta t \cdot \Delta \omega \geq \frac{1}{2}
$$

You cannot simultaneously know both the exact time and exact frequency of a signal with arbitrary precision. This is analogous to Heisenberg's uncertainty principle in quantum mechanics!

## Conclusion

The Fourier transform is a bridge between the time and frequency domains, revealing the hidden periodic structure in signals. Whether analyzing audio, processing images, or solving differential equations, the Fourier transform is an indispensable tool.

From Euler's beautiful formula $e^{i\pi} + 1 = 0$ to the practical FFT algorithms that power modern technology, Fourier analysis showcases the power and elegance of mathematics in solving real-world problems.

---

*Further Reading:*
- "The Fourier Transform and Its Applications" by Ronald Bracewell
- "Understanding Digital Signal Processing" by Richard Lyons
- "Fourier Analysis" by T.W. Körner
