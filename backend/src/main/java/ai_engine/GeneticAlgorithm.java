package ai_engine;

import models.Student;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class GeneticAlgorithm {
    
    // Mulu batch eke lamayi tika list of groups widihata save karaganna
    public List<List<Student>> population = new ArrayList<>();
    private final int GROUP_SIZE = 5; 

    // 1. Initial Population Generation (AI Concept 2: K-Means Stratified Seeding)
    public void generateInitialPopulation(List<Student> allStudents) {
        System.out.println("Stratifying student cohort using K-Means Clustering (k=3)...");
        this.population = KMeans.stratifyIntoTeams(allStudents, GROUP_SIZE, 3);
        System.out.println("Formed " + population.size() + " initial groups stratified across performance tiers.");
    }

    // 2. Fitness Function (Checking if groups are balanced)
    public double calculateFitness(List<Student> group) {
        double totalTechScore = 0;
        boolean hasDBA = false;
        boolean hasCOE = false;

        for (Student s : group) {
            totalTechScore += s.technicalScore;
            
            // Hard constraint: DBA saha COE mix wela inna onida kiyala balanawa
            if (s.degreeProgram.equalsIgnoreCase("DBA")) hasDBA = true;
            if (s.degreeProgram.equalsIgnoreCase("COE")) hasCOE = true;
        }

        // Group eke average tech score eka maninawa
        double average = totalTechScore / group.size();
        double fitness = average; 
        
        // Rule-based penalty: Degree programs mix wela nethnam fitness eka adu karanawa
        if (!hasDBA || !hasCOE) {
            fitness -= 20.0; 
        }
        
        return fitness; 
    }

    // 3. Crossover & Mutation (Swapping students to fix imbalances)
    public void optimizeGroups() {
        System.out.println("Running Genetic Algorithm to balance teams...");
        Random rand = new Random();
        
        // Iterations 100k run wela hodama balance eka hoyanawa
        for (int i = 0; i < 100; i++) { 
            if (population.size() < 2) break; // Swap karanna groups 2k wath oni

            int group1Index = rand.nextInt(population.size());
            int group2Index = rand.nextInt(population.size());
            
            if (group1Index == group2Index) continue;

            List<Student> group1 = population.get(group1Index);
            List<Student> group2 = population.get(group2Index);

            if (group1.isEmpty() || group2.isEmpty()) continue;

            // Random lamayi dennekwa select karanawa
            int student1Index = rand.nextInt(group1.size());
            int student2Index = rand.nextInt(group2.size());

            // Swap karanna kalin fitness eka
            double currentFitness = calculateFitness(group1) + calculateFitness(group2);

            // Lamayi dennekwa groups dekara maru karanawa (Mutation)
            Student s1 = group1.get(student1Index);
            Student s2 = group2.get(student2Index);
            group1.set(student1Index, s2);
            group2.set(student2Index, s1);

            // Swap kalata passe aluth fitness eka
            double newFitness = calculateFitness(group1) + calculateFitness(group2);

            // Aluth fitness eka parana ekata wada awul nam, aye hitiya thenatama maru karanawa
            if (newFitness < currentFitness) {
                 group1.set(student1Index, s1);
                 group2.set(student2Index, s2);
            }
        }
        System.out.println("Optimization complete! Teams are now balanced.");
    }
}