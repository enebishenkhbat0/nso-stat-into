# 1212-dashboard

NSO StatCate intro dashboards (Next.js). Live data from `https://data.1212.mn`.

## Local

```bash
npm install
npm run dev
```

## Deploy (NSO GitLab + k8s)

Same pattern as `nso-dashboard`:

1. Push to `main` → GitLab CI builds/pushes `gitlab.nso.mn:5050/enebish/1212-dashboard:latest`
2. Once (Lens / kubectl):

```bash
kubectl apply -f k8s/namespace.yaml
# Create gitlab-secret in 1212-dashboard ns (see k8s/gitlab-secret.example.yaml)
kubectl apply -f k8s/deployment.yaml
```

Host: http://1212-dashboard.app.nso.mn/
