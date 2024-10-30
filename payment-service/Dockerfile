FROM openjdk:17
WORKDIR /app
COPY target/payment-service-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8087
CMD ["java", "-jar", "app.jar"]