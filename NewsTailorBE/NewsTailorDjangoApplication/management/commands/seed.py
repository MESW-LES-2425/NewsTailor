from django.core.management.base import BaseCommand
from NewsTailorDjangoApplication.models import Category

# python manage.py seed --mode=refresh
""" Clear all data and creates addresses """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'

class Command(BaseCommand):
    help = "Seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('Done.')


def clear_data():
    """Deletes all the table data"""
    print("Deleting Category instances")
    Category.objects.all().delete()


def create_category(name):
    """Creates a Category object."""
    print(f"Creating category: {name}")
    category = Category(name=name)
    category.save()
    print(f"Category '{name}' created.")
    return category

def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear
    :return:
    """
    # Clear data from tables
    if mode == MODE_CLEAR:
        clear_data()
        return

    if mode == MODE_REFRESH:
        clear_data()

    categories = ["economy", "politics", "technology", "ai", "cryptocurrency"]

    for category in categories:
        create_category(name=category)
