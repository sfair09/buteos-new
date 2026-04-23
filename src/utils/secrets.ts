import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

async function resolveProjectId(): Promise<string> {
    // Prefer explicit env var, then client-detected project
    const envProject = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT_ID;
    if (envProject) return envProject;
    try {
        const pid = await client.getProjectId();
        return String(pid);
    } catch (e) {
        throw new Error('Unable to determine GCP project id for Secret Manager. Set GCP_PROJECT or GCLOUD_PROJECT env var.');
    }
}

export async function getSecret(secretId: string): Promise<string> {
    // First, allow runtime override via environment variable (works with Cloud Run secret-env)
    if (process.env[secretId]) {
        return process.env[secretId] as string;
    }

    const projectId = await resolveProjectId();
    try {
        const [secret] = await client.accessSecretVersion({
            name: `projects/${projectId}/secrets/${secretId}/versions/latest`,
        });
        return secret.payload ? secret.payload.data!.toString() : '';
    } catch (error: any) {
        console.error(`Error accessing secret ${secretId} in project ${projectId}:`, error.message || error);
        // Re-throw so callers can handle errors
        throw error;
    }
}

