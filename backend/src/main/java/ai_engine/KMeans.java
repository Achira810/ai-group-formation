package ai_engine;

import models.Student;
import java.util.ArrayList;
import java.util.List;

/**
 * AI Concept 2: K-Means Clustering (Unsupervised Machine Learning)
 * Stratifies the student cohort into k=3 performance tiers (Developing, Proficient, Advanced)
 * based on standardized technical scores before seeding the Genetic Algorithm.
 */
public class KMeans {

    public static class ClusterResult {
        public List<Double> centroids = new ArrayList<>();
        public List<List<Student>> clusters = new ArrayList<>();
        public List<String> tierLabels = new ArrayList<>();
    }

    public static ClusterResult runKMeans(List<Student> students, int k, int maxIterations) {
        ClusterResult result = new ClusterResult();
        if (students == null || students.isEmpty()) return result;

        int actualK = Math.min(k, students.size());
        if (actualK <= 1) {
            double sum = 0;
            for (Student s : students) sum += s.technicalScore;
            result.centroids.add(sum / students.size());
            result.clusters.add(new ArrayList<>(students));
            result.tierLabels.add("Standard");
            return result;
        }

        // Find min and max technical scores
        double minScore = Double.MAX_VALUE;
        double maxScore = Double.MIN_VALUE;
        for (Student s : students) {
            if (s.technicalScore < minScore) minScore = s.technicalScore;
            if (s.technicalScore > maxScore) maxScore = s.technicalScore;
        }

        // Initialize evenly spaced centroids across the score span
        double[] centroids = new double[actualK];
        for (int i = 0; i < actualK; i++) {
            double fraction = (i + 0.5) / actualK;
            centroids[i] = minScore + fraction * (maxScore - minScore);
        }

        List<List<Student>> clusters = new ArrayList<>();
        for (int i = 0; i < actualK; i++) clusters.add(new ArrayList<>());

        for (int iter = 0; iter < maxIterations; iter++) {
            for (int i = 0; i < actualK; i++) clusters.get(i).clear();

            // 1. Assignment Step
            for (Student s : students) {
                int closestIdx = 0;
                double minDist = Math.abs(s.technicalScore - centroids[0]);
                for (int i = 1; i < actualK; i++) {
                    double dist = Math.abs(s.technicalScore - centroids[i]);
                    if (dist < minDist) {
                        minDist = dist;
                        closestIdx = i;
                    }
                }
                clusters.get(closestIdx).add(s);
            }

            // 2. Update Step
            boolean converged = true;
            for (int i = 0; i < actualK; i++) {
                if (clusters.get(i).isEmpty()) continue;
                double sum = 0;
                for (Student s : clusters.get(i)) sum += s.technicalScore;
                double newMean = sum / clusters.get(i).size();
                if (Math.abs(newMean - centroids[i]) > 0.001) {
                    converged = false;
                }
                centroids[i] = newMean;
            }

            if (converged) break;
        }

        // Structure results and label tiers
        String[] defaultLabels = {"Developing (Tier 1)", "Proficient (Tier 2)", "Advanced (Tier 3)"};
        for (int i = 0; i < actualK; i++) {
            result.centroids.add(centroids[i]);
            result.clusters.add(clusters.get(i));
            result.tierLabels.add(i < defaultLabels.length ? defaultLabels[i] : "Cluster " + (i + 1));
        }

        return result;
    }

    /**
     * Stratifies the cohort using K-Means clusters to seed the initial GA population.
     */
    public static List<List<Student>> stratifyIntoTeams(List<Student> students, int groupSize, int k) {
        int numTeams = (int) Math.ceil((double) students.size() / groupSize);
        List<List<Student>> teams = new ArrayList<>();
        for (int i = 0; i < numTeams; i++) teams.add(new ArrayList<>());

        ClusterResult kResult = runKMeans(students, k, 50);

        int teamIndex = 0;
        boolean forward = true;

        // Distribute from highest tier to lowest tier across teams
        for (int c = kResult.clusters.size() - 1; c >= 0; c--) {
            List<Student> cluster = new ArrayList<>(kResult.clusters.get(c));
            cluster.sort((a, b) -> Double.compare(b.technicalScore, a.technicalScore));

            for (Student s : cluster) {
                teams.get(teamIndex).add(s);
                if (forward) {
                    teamIndex++;
                    if (teamIndex == numTeams) { teamIndex--; forward = false; }
                } else {
                    teamIndex--;
                    if (teamIndex < 0) { teamIndex++; forward = true; }
                }
            }
        }

        return teams;
    }
}
