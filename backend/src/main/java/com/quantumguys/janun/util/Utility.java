package com.quantumguys.janun.util;

public class Utility {

    public static String secToTime(long x){
        String s="";
        if(x/31536000>0){
            s+=x/31536000+" Years ";
        }
        x%=1536000;
        if(x/2592000>0){
            s+=x/2592000+" Months ";
        }
        x%=2592000;
        if(x/86400>0){
            s+=x/86400+" Days ";
        }
        x%=86400;
        if(x/3600>0){
            s+=x/3600+" Hours ";
        }
        x%=3600;
        if(x/60>0){
            s+=x/60+" Minutes ";
        }
        if(s.isEmpty())return "0 Seconds ";
        return s;
    }

}
