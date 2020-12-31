package com.boult.BoultDB;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Controller
public class WebAPI {

    @Autowired
    DataStore kfcStores;


    @RequestMapping(value = "/count", method = RequestMethod.GET)
    @ResponseBody
    public Integer countWorldWideKFCBranches(@RequestParam(required = false) String country) {
        if (country != null){
            return kfcStores.countBranchesByCountry(country);
        }
        return kfcStores.countWorldWideBranches();
    }

    @RequestMapping(value = "/open-branch", method = RequestMethod.POST)
    @ResponseBody
    public Boolean openKFCBranch(@RequestParam String country, @RequestParam String city){
        return kfcStores.addKFCBranch(country, city);
    }


    @RequestMapping(value = "/close-branch", method = RequestMethod.DELETE)
    @ResponseBody
    public Boolean closeKFCBranch(@RequestParam String country, @RequestParam String city){
        return kfcStores.removeKFCBranch(country, city);
    }


    @RequestMapping(value = "/check-branch", method = RequestMethod.GET)
    @ResponseBody
    public Boolean checkKFCBranchExists(@RequestParam String country, @RequestParam String city){
        return kfcStores.checkBranchExists(country, city);
    }


    @RequestMapping(value = "/branches", method = RequestMethod.GET)
    @ResponseBody
    public List<String> getKFCBranchesByCountry(@RequestParam String country){
        return kfcStores.getKFCBranchesByCountry(country);
    }


}
