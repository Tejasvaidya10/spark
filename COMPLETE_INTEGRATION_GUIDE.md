# Complete Figma Integration & AWS Deployment Guide

## 🎉 What's Been Done

✅ **Installed 40+ shadcn/ui dependencies** in frontend/package.json
✅ **Copied 48 UI components** from Spark to frontend/src/components/ui/
✅ **Merged Tailwind CSS configs** with Spark design tokens
✅ **Created utility functions** for className merging
✅ **Set up complete design system** with Spark colors and styling

---

## 📋 Current Project Status

Your project now has:
- **Backend**: Fully functional with AWS integration (DynamoDB, Bedrock, Socket.io)
- **Frontend**: Base React app + 48 Figma UI components ready to use
- **Next Step**: Integrate Spark page components and deploy to AWS

---

## 🚀 Part 1: Complete the Integration (6-8 hours)

### Step 1: Install Dependencies

```bash
# Backend
cd /Users/tejas/Documents/Hackathon/backend
npm install

# Frontend
cd /Users/tejas/Documents/Hackathon/frontend
npm install
```

This will install all the Spark/shadcn dependencies I added.

---

### Step 2: Copy Remaining Spark Components (Optional but Recommended)

You now have the UI library. To use the full Figma designs, copy the page components:

```bash
# Copy all Spark page components
cp /Users/tejas/Documents/Hackathon/Spark/src/components/Dashboard.tsx /Users/tejas/Documents/Hackathon/frontend/src/pages/
cp /Users/tejas/Documents/Hackathon/Spark/src/components/LoginPage.tsx /Users/tejas/Documents/Hackathon/frontend/src/pages/
cp /Users/tejas/Documents/Hackathon/Spark/src/components/Courses.tsx /Users/tejas/Documents/Hackathon/frontend/src/pages/
cp /Users/tejas/Documents/Hackathon/Spark/src/components/CareerPathway.tsx /Users/tejas/Documents/Hackathon/frontend/src/pages/
cp /Users/tejas/Documents/Hackathon/Spark/src/components/Mentorship.tsx /Users/tejas/Documents/Hackathon/frontend/src/pages/
cp /Users/tejas/Documents/Hackathon/Spark/src/components/JobsNetworking.tsx /Users/tejas/Documents/Hackathon/frontend/src/pages/
cp /Users/tejas/Documents/Hackathon/Spark/src/components/DashboardLayout.tsx /Users/tejas/Documents/Hackathon/frontend/src/components/
```

**Then manually**:
1. Update imports in copied files from `@/components/ui/*` to `../components/ui/*`
2. Replace mock data with API calls from `services/api.js`
3. Convert TypeScript to JavaScript (rename .tsx to .jsx and remove types) OR enable TypeScript

---

### Step 3: Configure AWS Credentials

Edit `backend/.env`:
```bash
cd /Users/tejas/Documents/Hackathon/backend
nano .env
```

Add your credentials:
```env
PORT=5000
JWT_SECRET=sparkpath_hackathon_secret_2024
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=YOUR_AWS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_HERE
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

### Step 4: Enable AWS Bedrock

1. Go to **AWS Console → Bedrock**
2. Click **Model access** (left sidebar)
3. Click **Enable specific models**
4. Enable: **Anthropic Claude 3 Sonnet**
5. Wait for approval (usually instant)

---

### Step 5: Create DynamoDB Tables

```bash
cd /Users/tejas/Documents/Hackathon/backend
npm run create-tables
```

Wait for all 9 tables to be created. You'll see:
```
✅ Table SparkPath-Users created successfully!
✅ Table SparkPath-Assessments created successfully!
... (7 more)
```

---

### Step 6: Seed Sample Data

```bash
npm run seed-data
```

This adds:
- 5 success stories
- 3 mentors
- 3 courses

---

### Step 7: Run Locally

**Terminal 1 - Backend:**
```bash
cd /Users/tejas/Documents/Hackathon/backend
npm run dev
```

You should see:
```
🚀 SparkPath server running on port 5000
📡 Socket.io server ready
🌍 Environment: development
```

**Terminal 2 - Frontend:**
```bash
cd /Users/tejas/Documents/Hackathon/frontend
npm run dev
```

You should see:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 8: Test Locally

1. Open **http://localhost:5173**
2. Click **Sign Up**
3. Complete the form
4. Test the assessment chatbot
5. Explore the dashboard

---

## ☁️ Part 2: Deploy to AWS

### Where to Save Files in AWS

#### A. Backend Files → AWS EC2

**What to deploy:**
```
/Users/tejas/Documents/Hackathon/backend/
├── middleware/
├── models/
├── routes/
├── scripts/
├── services/
├── server.js
├── package.json
└── .env (with production secrets)
```

**How to deploy:**

1. **Launch EC2 Instance**
   - AWS Console → EC2 → Launch Instance
   - AMI: Amazon Linux 2
   - Type: t2.micro (free tier)
   - Security Groups: Allow ports 22, 80, 443
   - Create/download key pair (.pem file)

2. **Connect to EC2**
   ```bash
   chmod 400 your-key.pem
   ssh -i your-key.pem ec2-user@YOUR-EC2-IP
   ```

3. **Install Node.js on EC2**
   ```bash
   curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
   sudo yum install -y nodejs git
   sudo npm install -g pm2
   ```

4. **Upload Backend Code**

   **Option A: Via SCP (from your Mac)**
   ```bash
   scp -i your-key.pem -r /Users/tejas/Documents/Hackathon/backend ec2-user@YOUR-EC2-IP:~/
   ```

   **Option B: Via Git (if you have a repo)**
   ```bash
   # On EC2
   git clone your-repo-url
   cd your-repo/backend
   ```

5. **Set up Backend on EC2**
   ```bash
   cd ~/backend
   npm install

   # Create production .env
   nano .env
   # Add production AWS credentials

   # Create tables (if not done)
   npm run create-tables
   npm run seed-data

   # Start with PM2
   pm2 start server.js --name sparkpath-api
   pm2 save
   pm2 startup  # Follow the command it outputs
   ```

6. **Check Backend Status**
   ```bash
   pm2 status
   pm2 logs sparkpath-api
   ```

---

#### B. Frontend Files → AWS S3 + CloudFront (Recommended)

**What to deploy:**
```
/Users/tejas/Documents/Hackathon/frontend/dist/
(The built output after running npm run build)
```

**How to deploy:**

1. **Build Frontend**
   ```bash
   cd /Users/tejas/Documents/Hackathon/frontend

   # Create production .env
   echo "VITE_API_URL=http://YOUR-EC2-IP:5000/api" > .env
   echo "VITE_SOCKET_URL=http://YOUR-EC2-IP:5000" >> .env

   npm run build
   ```

   This creates `dist/` folder with optimized files.

2. **Create S3 Bucket**
   - AWS Console → S3 → Create bucket
   - Name: `sparkpath-frontend-yourname` (must be unique)
   - Region: us-east-1
   - Uncheck "Block all public access"
   - Create

3. **Upload to S3**

   **Option A: AWS Console**
   - Open your bucket
   - Click Upload
   - Drag entire contents of `dist/` folder (NOT the dist folder itself)

   **Option B: AWS CLI**
   ```bash
   aws s3 sync dist/ s3://sparkpath-frontend-yourname/ --delete
   ```

4. **Enable Static Website Hosting**
   - Bucket → Properties → Static website hosting
   - Enable
   - Index document: `index.html`
   - Error document: `index.html`
   - Save

5. **Set Bucket Policy**
   - Bucket → Permissions → Bucket policy
   - Add this policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::sparkpath-frontend-yourname/*"
       }
     ]
   }
   ```

6. **Get Website URL**
   - Go to Properties → Static website hosting
   - Copy the **Bucket website endpoint**
   - Example: `http://sparkpath-frontend-yourname.s3-website-us-east-1.amazonaws.com`

---

#### C. Alternative: Serve Frontend from EC2 (Simpler but less scalable)

Instead of S3, you can serve frontend from the same EC2:

1. **Build and Upload Frontend**
   ```bash
   # On your Mac
   cd /Users/tejas/Documents/Hackathon/frontend
   npm run build

   # Upload to EC2
   scp -i your-key.pem -r dist ec2-user@YOUR-EC2-IP:~/frontend/
   ```

2. **Install Nginx on EC2**
   ```bash
   sudo yum install -y nginx
   ```

3. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/conf.d/sparkpath.conf
   ```

   Add:
   ```nginx
   server {
       listen 80;
       server_name YOUR-EC2-IP;

       # Frontend
       location / {
           root /home/ec2-user/frontend/dist;
           try_files $uri $uri/ /index.html;
           index index.html;
       }

       # Backend API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }

       # Socket.io
       location /socket.io {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
       }
   }
   ```

4. **Start Nginx**
   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

5. **Access App**
   - Visit: `http://YOUR-EC2-IP`

---

## 📊 AWS Services Summary

| Service | Purpose | Where to Save | Free Tier |
|---------|---------|---------------|-----------|
| **EC2** | Backend hosting | Upload `/backend` folder | 750 hrs/month (t2.micro) |
| **DynamoDB** | Database | Tables created via script | 25GB + 25 WCU/RCU |
| **Bedrock** | AI/LLM | No upload needed (API access) | Pay-per-use (~$0.01/conversation) |
| **S3** | Frontend hosting | Upload `/frontend/dist` contents | 5GB storage |
| **CloudFront** (Optional) | CDN | Points to S3 bucket | 50GB transfer |

**Total Monthly Cost (after free tier):** ~$10-15

---

## 🏃 How to Run Everything

### Local Development

```bash
# Terminal 1 - Backend
cd /Users/tejas/Documents/Hackathon/backend
npm run dev

# Terminal 2 - Frontend
cd /Users/tejas/Documents/Hackathon/frontend
npm run dev

# Visit: http://localhost:5173
```

### Production (AWS)

**Backend on EC2:**
```bash
# SSH into EC2
ssh -i your-key.pem ec2-user@YOUR-EC2-IP

# Check status
pm2 status
pm2 logs sparkpath-api

# Restart if needed
pm2 restart sparkpath-api
```

**Frontend on S3:**
```bash
# Any time you update frontend:
cd /Users/tejas/Documents/Hackathon/frontend
npm run build
aws s3 sync dist/ s3://your-bucket-name/ --delete
```

**Access Production:**
- **S3 only**: `http://your-bucket.s3-website...`
- **EC2 + Nginx**: `http://YOUR-EC2-IP`

---

## 🔍 Troubleshooting

### Backend won't start
```bash
# Check AWS credentials
cat backend/.env

# Check DynamoDB tables
aws dynamodb list-tables --region us-east-1

# Check Bedrock access
aws bedrock list-foundation-models --region us-east-1
```

### Frontend build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Can't connect to backend from frontend
- Check `VITE_API_URL` in frontend/.env
- Verify EC2 security group allows port 5000
- Check backend is running: `pm2 status`

---

## ✅ Quick Checklist

**Before Hackathon Demo:**
- [ ] Backend running on EC2 (`pm2 status` shows "online")
- [ ] DynamoDB tables exist (9 tables)
- [ ] Sample data seeded
- [ ] Bedrock enabled (Claude model)
- [ ] Frontend built and deployed
- [ ] Can access app via public URL
- [ ] Tested complete user flow (signup → assessment → dashboard)
- [ ] Have backup video recorded

---

## 📞 Quick Commands Reference

```bash
# Start local development
cd backend && npm run dev  # Backend
cd frontend && npm run dev # Frontend

# Deploy updates
npm run build                          # Build frontend
aws s3 sync dist/ s3://bucket/ --delete  # Deploy to S3
pm2 restart sparkpath-api             # Restart backend

# Check AWS status
pm2 status                            # Backend status
pm2 logs                              # Backend logs
aws s3 ls s3://your-bucket/          # S3 contents
```

---

## 🎬 Next Steps

1. **Install dependencies**: `cd frontend && npm install`
2. **Test locally**: Follow "Step 7: Run Locally"
3. **If working**: Deploy to AWS following Part 2
4. **Practice demo**: Use HACKATHON_GUIDE.md

---

## 📁 File Locations Summary

**Local Development:**
- Backend: `/Users/tejas/Documents/Hackathon/backend/`
- Frontend: `/Users/tejas/Documents/Hackathon/frontend/`
- Figma components: `/Users/tejas/Documents/Hackathon/Spark/`

**AWS Deployment:**
- Backend → EC2 at `/home/ec2-user/backend/`
- Frontend (built) → S3 bucket `s3://sparkpath-frontend-yourname/`
- Database → DynamoDB (9 tables, no file storage)
- AI → Bedrock (API access, no file storage)

---

**You're ready to complete the integration and deploy! 🚀**

Run `cd frontend && npm install` to get started!
