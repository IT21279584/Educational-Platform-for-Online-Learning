FROM openjdk:17
WORKDIR /app
COPY target/library-service-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8086
CMD ["java", "-jar", "app.jar"]