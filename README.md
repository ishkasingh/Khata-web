# 🧾 KhataWeb – B2B Retail Management Platform

> A real-world business solution built to help shopkeepers and distributors manage customer-specific pricing, receipts, and sales analytics.

![Banner](./Images/home.png)

---

## 📽️ Video Walkthrough

📺 [Watch the full demo here](https://drive.google.com/file/d/1GVL3HYnqBB4093LwK8CErW2r5FE_6zB8/view?usp=sharing)

---

## 🧑‍💼 Story Behind the Project

This project is incredibly close to my heart. I built **KhataWeb** to help my **father** manage his wholesale B2B business more efficiently — dealing with different customers, different prices, and a lot of receipts every day.

Instead of using spreadsheets or pen-paper ledgers, **KhataWeb** brings a smart and structured approach using modern technology.

---

## 🛠️ Tech Stack

- **Backend**: Spring Boot 3.x  
- **Frontend**: React + TailwindCSS (sales dashboard)  
- **Database**: MySQL  
- **Caching**: Redis  
- **Messaging**: Kafka  
- **Deployment**: Docker Compose (Kafka, Redis, MySQL)

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| 🧑‍💼 Role-based Access | Owner can update rates, employee can only generate receipts |
| 💰 Custom Rates | Assign different product prices to different customers |
| 🧾 Receipt Generation | Easy generation of receipts with item details, delivery toggle |
| 📧 Email Notifications | Receipt-based emails via Kafka (async & non-blocking) |
| 🚀 Redis Caching | Customer-wise receipt caching for faster access |
| 📊 Sales Analytics | Line & pie charts for monthly sales trends |
| 📦 Product Management | Tracks product stock and updates on every order |
| 🔐 Secure APIs | Proper validation and exception handling |

---

## 🖼️ Screenshots

### 📊 Sales Dashboard (React)

![Sales Chart](./Images/sales.png)

### 🧾 Receipt List View

![Receipt View](./Images/receipt.png)

### 🧑 Customer notification's

![Pricing Page](./Images/email.png)

---

## 🧪 Testing

- Unit tested using **Mockito** and Spring Boot Test
- Manual beta testing with real users (my father's shop staff)

---

## 🔧 Running the Project

### 1. Clone the repo

```bash
git clone https://github.com/priyanshujains/khata-web.git

```

### 2. Docker compose

```bash
 docker-compose up .
```



