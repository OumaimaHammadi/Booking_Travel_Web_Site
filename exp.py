class DateNaissance():
    def __init__(self,jour,mois,annee):
        self.jour=jour  
        self.mois=mois 
        self.annee=annee




    def toString(self,jour,mois,annee):
        x=["un","deux","dix"]
        y=["un","six","trois"]
        z=["deux-mille-six","deux-mille-trois","deux-mille-cinq","deux-mille-deux"]

        self.jour=x[1] 
        self.mois=y[2]
        self.annee=z[3]




    def Afficher(self):
        print("date de naissance est:",self.jour,self.mois,self.annee)
        



myDate=DateNaissance(2,3,2006)
myDate.toString(8,3,2002)
   
myDate.Afficher()

       
        
       



    

    
                                

        
        




#def toString(jour):       x=[un,deux,trois]

    #jour=x[1]

 #   return jour
#
#G=toString(jour)


#print("le jour est:",G) 
    