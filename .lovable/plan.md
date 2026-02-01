

# Valentine's Day "Will You Be My Valentine?" Web App 💕

A playful, interactive single-page website that asks someone to be your Valentine in a fun and memorable way!

---

## Page 1: Setup Screen (for the "asker")

A simple form where you configure your Valentine message before sharing:
- **Your name** (optional, for personalization)
- **Choose contact method** (dropdown): Email, SMS, WhatsApp, Snapchat, Instagram, Facebook Messenger
- **Enter your contact info** (phone number, username, or email based on selection)
- **"Generate My Valentine Link" button** → Creates a shareable URL with the settings encoded

The generated link can be copied and sent to your Valentine!

---

## Page 2: The Valentine Experience (for your Valentine)

### Visual Design
- **Color scheme**: Soft pinks, warm reds, and cream whites
- **Background**: Subtle gradient with floating heart particles
- **Typography**: Romantic, modern fonts (playful but readable)

### Hero Section (centered, full-screen)
- **Romantic headline**: "Hey, You... 💕"
- **Funny question**: "So I've been thinking... Will you be my Valentine? 🥺👉👈"
- **Optional personalization**: "- From [Your Name]" if provided

### The Two Buttons
1. **"Yes" Button** 💘
   - Large, prominent, glowing pink/red
   - Bouncy hover effect with sparkles
   - Text: "Aww, yes! 💘"

2. **"No" Button** 🥶
   - Initially gray/blue toned
   - **The Fun Part**: Escapes the cursor up to 7 times!
   - Each escape changes the text to something funnier:
     - "Nah, I'm cold-hearted 🥶"
     - "Are you sure?? 😢"
     - "Think again! 💔"
     - "You're breaking my heart! 😭"
     - "Fine, I'll let you click me..."
     - "Last chance to change your mind!"
     - (Finally clickable) "Okay, okay... 😔"
   - After 7 escapes, button stays still and becomes clickable

### Animations & Effects
- **Floating hearts**: Gentle hearts drifting upward in the background
- **Cursor trail**: Subtle heart particles following the mouse
- **Button hover**: Bouncy scale effect + soft glow
- **Escaping button**: Smooth, playful movement animation

---

## After Button Click: Celebration Screen

### If "Yes" is clicked 🎉
- **Explosion of hearts and confetti**
- **Big romantic message**: "Yay! You made me the happiest! 💕"
- **2-3 second celebration animation**
- **Auto-redirect** to the configured contact method with pre-filled message:
  - *"YES! I'll be your Valentine! 💕"*

### If "No" is clicked (after all escapes) 💔
- **Gentle sad animation** (maybe a single falling tear/heart)
- **Sweet message**: "That's okay... maybe next year? 💔"
- **2-3 second pause**
- **Auto-redirect** to contact method with message:
  - *"Sorry, maybe next year 💔"*

---

## Mobile Experience 📱

- Fully responsive design
- Touch-friendly large buttons
- The "No" button escape works on mobile too (moves to random positions)
- All animations optimized for mobile performance

---

## Technical Approach

- **No backend needed** - Settings encoded in URL parameters
- **Clean, well-commented code** - Easy to customize colors, texts, and contact options
- **Smooth 60fps animations** using CSS and lightweight JavaScript
- **Contact method integrations**:
  - Email → `mailto:` link
  - SMS → `sms:` link  
  - WhatsApp → `https://wa.me/` link
  - Snapchat → `https://snapchat.com/add/` link
  - Instagram → `https://instagram.com/` DM link
  - Facebook Messenger → `https://m.me/` link

---

This will be a delightful, shareable experience that's sure to make your Valentine smile! 💝

