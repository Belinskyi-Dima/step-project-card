export default
{
	"cardiologist": {
		"id": "cardiologist-form",
		"class": "cardiologist-form form",
		"fields":[
		
			{
				"type": "text",
				"id": "full-name",
				"name":"fullname",
				"label": "Full name"
			},
			{
				"type": "textArea",
				"id": "visit-goal",
				"name":"visitgoal",
				"label": "Visit goal"
			},
			{
				"type": "textArea",
				"id": "short-description",
				"name":"short-description",
				"label": "Short description"
			},
			{
				"type": "select",
				"id": "priority",
				"name":"priority",
				"label": "Priority",
				"options": [{
					"text":"Minor", 
					"value":"3"
				},
				{
					"text":"Major", 
					"value":"2"
				},
				{
					"text":"Critical", 
					"value":"1"
				}]
			},
			{
				"type": "number",
				"id": "pressure",
				"name":"pressure",
				"label": "Pressure"
			},
			{
				"type": "number",
				"id": "mass-index",
				"name":"massindex",
				"label": "Mass index"
			},
			{
				"type": "textArea",
				"id": "past-diseases",
				"name":"pastdiseases",
				"label": "Past diseases"
			},
			{
				"type": "number",
				"id": "age",
				"name":"age",
				"label": "Age"
			}
		]
	},
	"dentist":{
		"id": "dentist-form",
		"class": "dentist-form form",
		"fields":[

			{
				"type": "text",
				"id": "full-name",
				"name":"fullname",
				"label": "Full name"
			},
			{
				"type": "textArea",
				"id": "visit-goal",
				"name":"visitgoal",
				"label": "Visit goal"
			},
			{
				"type": "textArea",
				"id": "short-description",
				"name":"short-description",
				"label": "Short description"
			},
			{
				"type": "select",
				"id": "priority",
				"name":"priority",
				"label": "Priority",
				"options": [{
					"text":"Minor", 
					"value":"3"
				},
				{
					"text":"Major", 
					"value":"2"
				},
				{
					"text":"Critical", 
					"value":"1"
				}]
			},
			{
				"type": "number",
				"id": "age",
				"name":"age",
				"label": "your age"
			},
			{
				"type": "date",
				"id": "last-vists",
				"name":"lastvists",
				"label": "last Vist"
			}
			
		]
	},"therapist":{
		"id": "therapist-form",
		"class": "therapist-form form",
		"fields":[
			{
				"type": "text",
				"id": "full-name",
				"name":"fullname",
				"label": "Full name"
			},
			{
				"type": "textArea",
				"id": "visit-goal",
				"name":"visitgoal",
				"label": "Visit goal"
			},
			{
				"type": "textArea",
				"id": "short-description",
				"name":"short-description",
				"label": "Short description"
			},
			{
				"type": "select",
				"id": "priority",
				"name":"priority",
				"label": "Priority",
				"options": [{
					"text":"Minor", 
					"value":"3"
				},
				{
					"text":"Major", 
					"value":"2"
				},
				{
					"text":"Critical", 
					"value":"1"
				}]
			},
			{
				"type": "date",
				"id": "date-vists",
				"name":"datevists",
				"label": "date last Vist"
			}
		]
	}
}
