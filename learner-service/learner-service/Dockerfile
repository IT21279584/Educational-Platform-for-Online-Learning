FROM openjdk:17
WORKDIR /app
COPY target/learner-service-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8084
CMD ["java", "-jar", "app.jar"]