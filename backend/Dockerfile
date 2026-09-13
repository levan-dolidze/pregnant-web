FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "PregnantWeb.csproj" -r linux-x64
RUN dotnet publish "PregnantWeb.csproj" -c Release -o /app/publish -r linux-x64 --self-contained false -p:PublishReadyToRun=true

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:10000
ENV DOTNET_gcServer=0
EXPOSE 10000
ENTRYPOINT ["dotnet", "PregnantWeb.dll"]
