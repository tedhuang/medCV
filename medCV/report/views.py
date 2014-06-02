from django.shortcuts import render

from django.http import HttpResponse

from django.template import Template, context, RequestContext

def index(request):
    
    return render(request, 'report/index.html', {}, 
    			  context_instance=RequestContext(request))