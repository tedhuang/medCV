import csv
import json
question_lookup = []
results = {}

patient_prefix = "1000"

with open("TickiT case reports.csv" ) as f:
  csvreader = csv.reader(f)

  header_row = csvreader.next()

  # build the array of questions
  for question in header_row[2:]:
    results[question] = []
    question_lookup.append(question)

  # throwaway free line
  csvreader.next()

  # parse data rows
  for rows in csvreader:
    patient_id = rows[0]
    responses = rows[2:]

    # only get responses for the patient we're interested in
    if not patient_prefix in patient_id:
      continue

    age = int(patient_id[-2:])

    for i,response in enumerate(responses):
      # print [i, response]
      question = question_lookup[i]
      results[question].append({"age": age, "response": response})


# parse into a category
grouped_results = {}
for key,value in results.items():
  print [key, value]
  category,question = key.split(":")[:2]
  if not category in grouped_results:
    grouped_results[category] = {}

  grouped_results[category][question] = value

# write output to file
with open("%s_1.json" % (patient_prefix), 'wb') as out:
  json.dump(grouped_results, out)

