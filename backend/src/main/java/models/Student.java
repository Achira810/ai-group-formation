package models;

public class Student {
    public String id;
    public String studentId;
    public String degreeProgram;
    public double technicalScore;
    public double softSkillScore;

    public Student(String id, String studentId, String degreeProgram, double technicalScore, double softSkillScore) {
        this.id = id;
        this.studentId = studentId;
        this.degreeProgram = degreeProgram;
        this.technicalScore = technicalScore;
        this.softSkillScore = softSkillScore;
    }
}