package com.boult;

import java.util.List;
import java.util.Map;

public class BoultDB {

    public static void main(String[] args){

        // Testing CRUD operations
        testCRUDOperations();

    }


    public static void testCRUDOperations(){

        DataStore dataStore = new DataStore();
        Boolean result;
        int count;
        List<String> cities;
        result = dataStore.addKFCBranch("Pakistan", "Karachi");
        System.out.println("Opening KFC Branch in Karachi, PK. Result: " + result);
        result = dataStore.addKFCBranch("United States", "Dallas");
        System.out.println("Opening KFC Branch in Dallas, US. Result: " + result);
        result = dataStore.addKFCBranch("United States", "Chicago");
        System.out.println("Opening KFC Branch in Chicago, US. Result: " + result);


        count = dataStore.countWorldWideBranches();
        System.out.println("Number of KFC Branches worldwide: " + count);

        cities = dataStore.getKFCBranchesByCountry("United States");
        System.out.println("KFC Branches in US: " + cities);

        result = dataStore.checkBranchExists("United States", "New York");
        System.out.println("KFC Branch in New York: " + result);

        result = dataStore.checkBranchExists("United States", "Dallas");
        System.out.println("KFC Branch in Dallas: " + result);

        result = dataStore.removeKFCBranch("United States", "Dallas");
        System.out.println("KFC Branch in Dallas closed: " + result);

        result = dataStore.removeKFCBranch("Pakistan", "Multan");
        System.out.println("KFC Branch in Multan closed: " + result);

        count = dataStore.countWorldWideBranches();
        System.out.println("Number of KFC Branches worldwide: " + count);

    }

}
