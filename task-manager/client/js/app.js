'use strict';

var taskManager = {};

// helpers
taskManager.createCategory = function(category) {
    if (category === '') {
        return;
    }
    
    var categoryField = $('select[name="category"]');
    
    $('<option>').val(category).text(category).appendTo(categoryField);
    
    categoryField.val(category);
};
 
taskManager.createTask = function(task, category) {
    if (task === '' || category === '') {
        return;
    }
    
    var item = $('<a>').attr('href', '#').text(task).wrap('<li>');
    item.appendTo('.js-taskList ul').hide().fadeIn();
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
    
    $(e.target).toggleClass('completed');
};

taskManager.clickRemoveCompleted = function(e) {
    e.preventDefault();
    
    $('.js-taskList ul a.completed').parent().fadeOut(function() {
        $(this).remove();
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
    taskManager.addEvents();
});