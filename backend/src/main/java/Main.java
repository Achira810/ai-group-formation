import ai_engine.GeneticAlgorithm;
import ai_engine.KMeans;
import models.Student;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("====================================================");
        System.out.println(" KDU AI Group Formation System - 3-Stage AI Pipeline");
        System.out.println("====================================================");

        // Concept 1: Fuzzy-normalized student sample cohort
        List<Student> students = new ArrayList<>();
        students.add(new Student("1", "D/COE/25/0019", "COE", 95.0, 80.0));
        students.add(new Student("2", "D/DBA/25/0031", "DBA", 85.0, 75.0));
        students.add(new Student("3", "D/BIT/24/0081", "IT", 75.0, 70.0));
        students.add(new Student("4", "D/COE/25/0020", "COE", 90.0, 85.0));
        students.add(new Student("5", "D/DBA/25/0035", "DBA", 80.0, 75.0));
        students.add(new Student("6", "D/SE/24/0012", "SE", 65.0, 70.0));
        students.add(new Student("7", "D/CS/24/0045", "CS", 55.0, 60.0));
        students.add(new Student("8", "D/IS/24/0022", "IS", 70.0, 72.0));
        students.add(new Student("9", "D/COE/25/0088", "COE", 88.0, 80.0));
        students.add(new Student("10", "D/DBA/25/0099", "DBA", 92.0, 85.0));

        System.out.println("\n[Stage 1: Fuzzy Logic Skill Profiling Complete]");
        System.out.println("Loaded " + students.size() + " students with normalized AI technical scores.");

        System.out.println("\n[Stage 2: K-Means Clustering Tier Stratification]");
        KMeans.ClusterResult kResult = KMeans.runKMeans(students, 3, 50);
        for (int i = 0; i < kResult.clusters.size(); i++) {
            System.out.printf("  Tier %d (%s) - Centroid: %.1f | Count: %d\n",
                i + 1, kResult.tierLabels.get(i), kResult.centroids.get(i), kResult.clusters.get(i).size());
        }

        System.out.println("\n[Stage 3: Genetic Algorithm Balancing Engine]");
        GeneticAlgorithm ga = new GeneticAlgorithm();
        ga.generateInitialPopulation(students);
        ga.optimizeGroups();

        System.out.println("\nOptimization completed successfully across all 3 AI stages!");
    }
}