from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connection
from djongo import models

# Define models for direct use if not already present in the app
class User(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'users'

class Team(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'teams'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    duration = models.IntegerField()
    date = models.DateField()
    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'activities'

class Leaderboard(models.Model):
    user = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'leaderboard'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'
        db_table = 'workouts'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear collections
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes team')
        dc = Team.objects.create(name='DC', description='DC superheroes team')

        # Create users
        users = [
            User.objects.create(email='tony@stark.com', name='Tony Stark', team='Marvel'),
            User.objects.create(email='steve@rogers.com', name='Steve Rogers', team='Marvel'),
            User.objects.create(email='bruce@wayne.com', name='Bruce Wayne', team='DC'),
            User.objects.create(email='clark@kent.com', name='Clark Kent', team='DC'),
        ]

        # Create activities
        Activity.objects.create(user='Tony Stark', type='Running', duration=30, date='2025-12-01')
        Activity.objects.create(user='Steve Rogers', type='Cycling', duration=45, date='2025-12-02')
        Activity.objects.create(user='Bruce Wayne', type='Swimming', duration=60, date='2025-12-03')
        Activity.objects.create(user='Clark Kent', type='Running', duration=50, date='2025-12-04')

        # Create leaderboard
        Leaderboard.objects.create(user='Tony Stark', points=100)
        Leaderboard.objects.create(user='Steve Rogers', points=90)
        Leaderboard.objects.create(user='Bruce Wayne', points=95)
        Leaderboard.objects.create(user='Clark Kent', points=110)

        # Create workouts
        Workout.objects.create(name='Super Strength', description='Strength workout for heroes', difficulty='Hard')
        Workout.objects.create(name='Speed Run', description='Speed and agility training', difficulty='Medium')
        Workout.objects.create(name='Flight Training', description='Aerobic and flight skills', difficulty='Easy')

        # Ensure unique index on email for users
        with connection.cursor() as cursor:
            cursor.db_conn['users'].create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
