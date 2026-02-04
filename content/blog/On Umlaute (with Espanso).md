---
date: 2025-12-22
tags:
 - MyBlog/Technology
---

Recently, i built a new mechanical Keyboard. I based this on an american layout, as the `[`, `]` and `\` Keys are more accessible. This poses a problem how to type the German Characters `Ä`, `Ü`, `Ö` ("Umlaute") and `ß`. Ideally, i'd want to implement this by customizing the firmware[^1] of the keyboard. But as the base-layout is US, there is no way for the micro-controller on the board to communicate the characters to the OS. So there are 2 options
1. Register the keyboard as a german keyboard, and "rebuild" the US Layout in [QMK](https://qmk.fm/). (time-intensive)
2. Send the characters as unicodes

Option 2 is problematic too, since i use multiple operating systems (Fedora on the Desktop, a Macbook and Windows for Work). Since different OSes require different methods of sending unicode characters, i'd have to build in a switch, where the current os can be configured. This, again, is time-intensive. What then? Implement the Umlaute on the software layer. This can be done with a hotkey application. Requirements:
- Open-Source (Since this is also a keylogger, basically)
- Cross-Platform (I want to reuse the configuration, DRY!)

My choice fell on [Espanso](https://github.com/espanso/espanso). On Fedora, there are 2 installation options
1. Use the Package from the [Terra](https://developer.fyralabs.com/terra) repositories. The package is created directly from the Github-actions pipeline. This is a potential security risk[^2].
2. Manual compilation

The rest of this post is a set of instructions on how i did this. To replicate, also refer to the [official Instructions](https://espanso.org/docs/install/linux/#wayland-compile).

## Compiling, installing and setting up Espanso on Fedora Linux
#### Prerequisites
- Fedora system
- Cargo / Rust
- X11 or Wayland[^3]

Install required packages:

```bash
sudo dnf install cargo
sudo dnf install wxGTK-devel
sudo dnf install libcap # For setting permissions for keyboard access later
````

#### Compile Espanso

```bash
git clone https://github.com/espanso/espanso.git --depth 1
cd espanso
```

```bash
cargo build --release --no-default-features --features wayland,modulo,vendored-tl
```

```bash
sudo cp target/release /opt/espanso/espanso
sudo chmod +x /usr/local/bin/espanso
```

#### Espanso Capabilities

```bash
sudo setcap cap_dac_override+ep /opt/espanso/espanso
getcap /opt/espanso/espanso
```

#### Configure German Umlaute

File: `~/.config/espanso/match/german.yml`
- Prefix: `;;`
- `word: false` → anywhere

```yaml
matches:
  - trigger: ";;a"
    replace: "ä"
    word: false
  - trigger: ";;A"
    replace: "Ä"
    word: false
  - trigger: ";;o"
    replace: "ö"
    word: false
  - trigger: ";;O"
    replace: "Ö"
    word: false
  - trigger: ";;u"
    replace: "ü"
    word: false
  - trigger: ";;U"
    replace: "Ü"
    word: false
  - trigger: ";;s"
    replace: "ß"
    word: false
```

Here is a [Github-Gist](https://gist.github.com/fabsch225/36f9cba3dbf821f72d7310002a127ca1).
#### Start Espanso

```bash
espanso register
espanso start
espanso status
```

Test in editor:

```
;;a → ä
;;A → Ä
;;o → ö
;;O → Ö
;;u → ü
;;U → Ü
;;s → ß
```


[^1]: https://qmk.fm/

[^2]: https://espanso.org/docs/install/linux/#terra-wayland

[^3]: https://espanso.org/docs/install/linux/#choosing-the-right-install-method

