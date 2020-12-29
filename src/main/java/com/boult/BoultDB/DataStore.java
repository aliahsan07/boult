package com.boult.BoultDB;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Scope("singleton")
public class DataStore {

    static Map<String, List<String>> kfcBranches = new HashMap<>();

    public Boolean addKFCBranch(String country, String city){

        if (kfcBranches.containsKey(country)){
            boolean contains = kfcBranches.get(country).contains(city);
            if (contains)
                return false;
            kfcBranches.get(country).add(city);
            return true;
        }

        kfcBranches.put(country, new ArrayList<String>(){{
            add(city);
        }});

        return true;
    }


    public List<String> getKFCBranchesByCountry(String country){

        return kfcBranches.getOrDefault(country, new ArrayList<>());
    }


    public Boolean removeKFCBranch(String country, String city){
        if (kfcBranches.containsKey(country)){
            boolean contains = kfcBranches.get(country).contains(city);
            if (contains) {
                kfcBranches.get(country).remove(city);
                return true;
            }
        }

        return false;
    }

    public Boolean checkBranchExists(String country, String city){
        if (kfcBranches.containsKey(country)){
            boolean contains = kfcBranches.get(country).contains(city);
            return contains;
        }

        return false;
    }

    public Integer countWorldWideBranches(){

        Collection<List<String>> values = kfcBranches.values();
        int total = 0;
        for (List<String> sublist : values) {
            // TODO: Null checking
            total += sublist.size();
        }

        return total;
    }

    public Integer countBranchesByCountry(String country) {
        if (kfcBranches.containsKey(country)) {
            return kfcBranches.get(country).size();
        }

        return 0;
    }
}
