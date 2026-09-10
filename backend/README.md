# PregnantWeb

ASP.NET Core 8 Web API with Swagger and a local SQLite database.

## Run it

```bash
cd PregnantWeb
dotnet restore
dotnet run
```

Open the URL printed in the console (e.g. `http://localhost:5xxx/swagger`) to get the Swagger UI.

On first run, `todos.db` (SQLite file) is created automatically next to the project and seeded with two todo items — see `Program.cs` (`db.Database.EnsureCreated()`).

## Endpoints

**Contact** — `GET /api/contact/info` → `{ address, mobileNumber, email, workingHours }` (static data, no DB).

**Todos** (backed by SQLite via EF Core):
- `GET /api/todos` — list all
- `GET /api/todos/{id}` — get one
- `POST /api/todos` — create (`{ "title": "...", "isDone": false }`)
- `PUT /api/todos/{id}` — update
- `DELETE /api/todos/{id}` — delete

## Project layout

- `Models/` — `TodoItem`, `ContactInfo` (plain data classes)
- `Data/TodoDbContext.cs` — EF Core DbContext + seed data
- `Controllers/` — `TodosController`, `ContactController`
- `Program.cs` — service registration (controllers, Swagger, EF Core/SQLite), request pipeline
- `appsettings.json` — connection string (`ConnectionStrings:Default`)

`WeatherForecastController.cs` / `WeatherForecast.cs` are the default template sample — safe to delete, kept only as reference.

## Moving from EnsureCreated to real migrations

`EnsureCreated()` is fine to get started, but it won't track future schema changes. When you're ready for real migrations:

```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Then remove the `db.Database.EnsureCreated()` block in `Program.cs` — migrations will manage the schema instead.

## Note on this build

This project was built and its in-memory version of the Todos API was fully compiled and exercised (GET/POST/PUT/DELETE all tested) in a sandboxed environment without access to nuget.org. The final EF Core + SQLite wiring shown here uses standard, well-established APIs but could not be restored/compiled in that sandbox — run `dotnet restore` on your machine (normal internet access) to pull `Swashbuckle.AspNetCore` and `Microsoft.EntityFrameworkCore.Sqlite`/`.Design`, then `dotnet build` to confirm.
