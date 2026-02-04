---
date: 2025-08-13
tags:
  - MyBlog/Math
  - MyBlog/Programming
  - MyBlog/Simulation
---

Simulating a [double pendulum](https://en.wikipedia.org/wiki/Double_pendulum) involves solving its equations of motion, which are derived from [Lagrangian mechanics](https://en.wikipedia.org/wiki/Lagrangian_mechanics). These equations form a system of nonlinear second-order ordinary differential equations (ODEs).

### Differential equations
The double pendulum system consists of two point masses $m_1$​ and $m_2$​, attached by rigid massless rods of lengths $l_1$​ and $l_2$​, swinging under gravity. Let $\theta_1$​ and $\theta_2$​ be the angles each pendulum makes, measured from the vertical.
$$
\begin{aligned}
\ddot{\theta}_1 &= \frac{
  -g (2m_1 + m_2) \sin\theta_1 - m_2 g \sin(\theta_1 - 2\theta_2)
  - 2 \sin(\theta_1 - \theta_2) m_2
  \left( \dot{\theta}_2^2 l_2 + \dot{\theta}_1^2 l_1 \cos(\theta_1 - \theta_2) \right)
}{
  l_1 \left( 2m_1 + m_2 - m_2 \cos(2\theta_1 - 2\theta_2) \right)
} \\[1em]
\ddot{\theta}_2 &= \frac{
  2 \sin(\theta_1 - \theta_2)
  \left( \dot{\theta}_1^2 l_1 (m_1 + m_2) + g (m_1 + m_2) \cos\theta_1
  + \dot{\theta}_2^2 l_2 m_2 \cos(\theta_1 - \theta_2) \right)
}{
  l_2 \left( 2m_1 + m_2 - m_2 \cos(2\theta_1 - 2\theta_2) \right)
}
\end{aligned}
$$

Since analytical solutions aren't known, we use numerical methods to approximate the pendulum's motion.
### Numerical Integration of ODEs
To simulate physical systems we compute the system's state at each step using estimates of its derivatives. 
### Runge-Kutta
The [Runge-Kutta methods](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods) are a family of iterative techniques for integrating ODEs. Commonly used is the 4th-order Runge-Kutta (RK4) method. RK4 improves upon simpler methods like Euler's by sampling the derivative multiple times at each step.
### Implementation in C++
Here are the differential equations, expressed in c++:

```c++
typedef std::vector<double> State;  
  
// ########### Derivatives function for RK4 ###########  
State derivatives(const State& y) {  
    const double theta1 = y[0];  
    const double theta2 = y[1];  
    const double omega1 = y[2];  
    const double omega2 = y[3];  
  
    const double delta = theta2 - theta1;  
  
    const double den1 = (m1 + m2) * l1 - m2 * l1 * std::cos(delta) * std::cos(delta);  
    const double den2 = (l2 / l1) * den1;  
  
    double domega1 = (  
        m2 * l1 * omega1 * omega1 * std::sin(delta) * std::cos(delta) +  
        m2 * g * std::sin(theta2) * std::cos(delta) +  
        m2 * l2 * omega2 * omega2 * std::sin(delta) -  
        (m1 + m2) * g * std::sin(theta1)  
    ) / den1;  
  
    double domega2 = (  
        -m2 * l2 * omega2 * omega2 * std::sin(delta) * std::cos(delta) +  
        (m1 + m2) * (  
            g * std::sin(theta1) * std::cos(delta) -  
            l1 * omega1 * omega1 * std::sin(delta) -  
            g * std::sin(theta2)  
        )  
    ) / den2;  
  
    return { omega1, omega2, domega1, domega2 };  
}
```

In the [full implementation](https://github.com/fabsch225/ComputerGraphicsMisc/blob/master/graphics/pendulum/double_pendulum.cpp), we perform one step per frame.

```c++
// ########### RK4 integrator step ###########  
State rk4_step(const State& y, double dt) {  
    const State k1 = derivatives(y);  
    State y_temp(4);  
  
    for (int i = 0; i < 4; ++i) y_temp[i] = y[i] + 0.5 * dt * k1[i];  
    const State k2 = derivatives(y_temp);  
  
    for (int i = 0; i < 4; ++i) y_temp[i] = y[i] + 0.5 * dt * k2[i];  
    const State k3 = derivatives(y_temp);  
  
    for (int i = 0; i < 4; ++i) y_temp[i] = y[i] + dt * k3[i];  
    const State k4 = derivatives(y_temp);  
  
    State y_next(4);  
    for (int i = 0; i < 4; ++i)  
        y_next[i] = y[i] + dt / 6.0 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);  
  
    return y_next;  
}
```

### Result
![[pendulum.gif]]