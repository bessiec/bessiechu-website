import csv

with open('fifa.csv', newline='') as csvfile:
	artreader = csv.reader(csvfile,",")
	