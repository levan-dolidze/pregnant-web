# pregnant-web

Monorepo for the PregnantWeb platform.

- [`frontend/`](frontend/) — Angular app
- [`backend/`](backend/) — ASP.NET Core 6 API

## Setup

```bash
cd frontend
npm install
ng serve
```

```bash
cd backend
cp appsettings.json.example appsettings.json  # fill in real secrets
dotnet restore
dotnet run
```
