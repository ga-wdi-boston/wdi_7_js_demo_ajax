'use strict';

var taskManager = {};

// helpers
taskManager.fetchCategories = function() {
    $.ajax({
        url: 'http://localhost:3000/categories',
        type: 'GET'
    }).done(function(response) {
        taskManager.buildCategorySelect(response);
    });
};

taskManager.fetchTasks = function() {
    $.ajax({
        url: 'http://localhost:3000/tasks',
        type: 'GET'
    }).done(function(response) {
        taskManager.buildTaskList(response);
    });
};

taskManager.buildCategorySelect = function(categories) {
    $.each(categories, function(index, item) {
        var option = $('<option value="'+item.id+'">'+item.name+'</option>');
        
        $('select[name="category"]').append(option);
    });
};

taskManager.buildTaskList = function(tasks) {
    $.each(tasks, function(index, item) {
        var li = $('<li data-id="'+item.id+'" data-status="'+this.status+'"><a href="#">'+item.name+'</li>');
        
        $('.js-taskList ul').append(li);
    });
};

taskManager.createCategory = function(category) {
    if (category === '') {
        return;
    }
    
    $.ajax({
        url: 'http://localhost:3000/categories',
        type: 'POST',
        data: JSON.stringify({
            name: category
        })
    }).done(function(response) {
        var categoryField = $('select[name="category"]');
        
        $('<option>').val(category).text(category).appendTo(categoryField);
        
        categoryField.val(category);
    });
};
 
taskManager.createTask = function(task, category) {
    if (task === '' || category === '') {
        return;
    }
    
    $.ajax({
        url: 'http://localhost:3000/tasks',
        type: 'POST',
        data: JSON.stringify({
            name: task,
            category: category
        })
    }).done(function(response) {
        var li = $('<li data-id="'+response.id+'" data-status="'+response.status+'"><a href="#">'+response.name+'</li>');
        li.appendTo('.js-taskList ul').hide().fadeIn();
    });
};

// event actions
taskManager.submitCategoryForm = function(e) {
    e.preventDefault();
    
    var categoryField = $(this).find('input[name="category"]');
    
    taskManager.createCategory(categoryField.val());
    
    categoryField.val('');
};

taskManager.submitTaskForm = function(e) {
    e.preventDefault();
    
    var task = $(this).find('input[name="task"]').val();
    var category = $(this).find('select[name="category"]').val();
    
    taskManager.createTask(task, category);
    
    $(this).find('input[name="task"]').val('');
    $(this).find('select[name="category"]').val('');
};

taskManager.clickTaskItem = function(e) {
    e.preventDefault();
    
    var eventContext = this;
    
    var id = $(this).parent().attr('data-id');
    var status = ($(this).parent().attr('data-status') === '2') ? 0 : 2;
    
    $.ajax({
        url: 'http://localhost:3000/tasks/' + id,
        type: 'PUT',
        data: JSON.stringify({
            status: status
        })
    }).done(function(response) {
        $(eventContext).parent().attr('data-status', status);
    });
};

taskManager.clickRemoveCompleted = function(e) {
    e.preventDefault();
    
    $('.js-taskList ul li[data-status="2"]').each(function() {
        var iteratorContext = this;
        
        var id = $(iteratorContext).attr('data-id');
        
        $.ajax({
            url: 'http://localhost:3000/tasks/' + id,
            type: 'DELETE'
        }).done(function(response) {
            $(iteratorContext).fadeOut(function() {
                $(this).remove();
            });
        });
    });
};

// event listeners
taskManager.addEvents = function() {
    $('.js-categoryForm').on('submit', taskManager.submitCategoryForm);
    
    $('.js-taskForm').on('submit', taskManager.submitTaskForm);
    
    $('.js-taskList ul').on('click', 'a', taskManager.clickTaskItem);
    
    $('.js-removeCompleted').on('click', taskManager.clickRemoveCompleted);
};

// DOM ready
$(function() {
    $.ajaxSetup({
        contentType: 'application/json'
    });
    
    taskManager.addEvents();
    taskManager.fetchCategories();
    taskManager.fetchTasks();
});