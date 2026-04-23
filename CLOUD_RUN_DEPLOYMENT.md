# Cloud Run Deployment Guide

This guide explains how to deploy the Buteos Systems website to Google Cloud Run.

## Prerequisites

1. Google Cloud SDK installed and configured
2. Docker installed (for local testing)
3. Google Cloud project with billing enabled
4. Cloud Run API enabled

## Quick Deployment

### Option 1: Using the deployment script (Recommended)

```bash
./deploy.sh YOUR_PROJECT_ID us-central1
```

### Option 2: Manual deployment

1. **Build and submit to Cloud Build:**
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

2. **Or build and deploy manually:**
   ```bash
   # Build the Docker image
   docker build -t gcr.io/YOUR_PROJECT_ID/buteos-systems .
   
   # Push to Container Registry
   docker push gcr.io/YOUR_PROJECT_ID/buteos-systems
   
   # Deploy to Cloud Run
   gcloud run deploy buteos-systems \
     --image gcr.io/YOUR_PROJECT_ID/buteos-systems \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 8080 \
     --memory 1Gi \
     --cpu 1 \
     --min-instances 1 \
     --max-instances 10
   ```

## Environment Variables

Set your environment variables in Cloud Run:

```bash
gcloud run services update buteos-systems \
  --region us-central1 \
  --set-env-vars="NODE_ENV=production,IONOS_SMTP_HOST=smtp.ionos.com,IONOS_SMTP_PORT=587"
```

For sensitive variables, use Google Secret Manager:

```bash
# Create secrets
gcloud secrets create stripe-secret-key --data-file=-
gcloud secrets create emailjs-service-id --data-file=-

# Grant Cloud Run access to secrets
gcloud run services update buteos-systems \
  --region us-central1 \
  --set-secrets="STRIPE_SECRET_KEY=stripe-secret-key:latest,NEXT_PUBLIC_EMAILJS_SERVICE_ID=emailjs-service-id:latest"
```

## Local Testing

Test the Docker container locally:

```bash
# Build the image
docker build -t buteos-systems .

# Run locally
docker run -p 8080:8080 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_BASE_URL=http://localhost:8080 \
  buteos-systems
```

## Key Changes from App Engine

1. **Port**: Cloud Run uses port 8080 (configured in Dockerfile)
2. **Startup**: Uses standalone Next.js server instead of App Engine runtime
3. **Scaling**: Configured for 1-10 instances with 1GB memory
4. **Environment**: All environment variables need to be set in Cloud Run service

## Monitoring

View logs and metrics:
```bash
# View logs
gcloud run services logs tail buteos-systems --region us-central1

# Get service details
gcloud run services describe buteos-systems --region us-central1
```

## Custom Domain

To use a custom domain:

1. **Map domain:**
   ```bash
   gcloud run domain-mappings create \
     --service buteos-systems \
     --domain buteossystems.com \
     --region us-central1
   ```

2. **Update DNS records as instructed by the command output**

## Cost Optimization

- **CPU allocation**: Only during request processing
- **Memory**: 1GB (adjust based on usage)
- **Min instances**: 1 (set to 0 for cost savings if cold starts are acceptable)
- **Max instances**: 10 (adjust based on expected traffic)