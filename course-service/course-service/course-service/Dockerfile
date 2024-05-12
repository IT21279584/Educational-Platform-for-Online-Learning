FROM openjdk:17
WORKDIR /app
COPY target/course-service-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8083
CMD ["java", "-jar", "app.jar"]