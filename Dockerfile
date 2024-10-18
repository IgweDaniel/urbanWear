# Stage 1: Build stage
FROM python:3.11-slim AS builder

# Install necessary system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry in the build stage
RUN pip install poetry 

# Set the working directory
WORKDIR /app

# Copy Poetry configuration files
COPY pyproject.toml poetry.lock /app/

# Install dependencies via Poetry
RUN poetry config virtualenvs.path venv && poetry install
# RUN poetry config virtualenvs.create false && poetry install --no-dev --no-root

# Copy application code
COPY . .

# Stage 2: Final stage
FROM python:3.11-slim
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN rm /bin/sh && ln -s /bin/bash /bin/sh && pip install poetry 
# RUN 

# Set the working directory
WORKDIR /app

# Copy only the necessary application files from the build stage
COPY --from=builder /app /app

# RUN poetry config virtualenvs.path venv && source $(poetry env info --path)/bin/activate
# Expose the port for the application
EXPOSE 8000

# Run entrypoint and start the Django server
ENTRYPOINT ["./entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
