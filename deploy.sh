#!/bin/bash

# Deployment script for Buteos Systems to Cloud Run

set -e

# Configuration
PROJECT_ID=${1:-"buteos-systems"}
REGION=${2:-"us-central1"}
SERVICE_NAME="buteos-systems"

echo "🚀 Deploying Buteos Systems to Cloud Run..."
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo "Service Name: $SERVICE_NAME"

# Project setup
echo "⚙️ Setting up project configuration..."
gcloud auth application-default set-quota-project $PROJECT_ID
gcloud config set project $PROJECT_ID

# Build and deploy using Cloud Build
echo "📦 Building and deploying with Cloud Build..."
gcloud builds submit --config cloudbuild.yaml --project $PROJECT_ID

echo "✅ Deployment complete!"
echo "🌐 Your application should be available at:"
gcloud run services describe $SERVICE_NAME --region=$REGION --project=$PROJECT_ID --format="value(status.url)"