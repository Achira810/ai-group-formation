import ai_engine.GeneticAlgorithm;

public class Main {
    public static void main(String[] args) {
        System.out.println("Starting AI Group Formation System...");
        GeneticAlgorithm ga = new GeneticAlgorithm();
        ga.optimizeGroups();
    }
}