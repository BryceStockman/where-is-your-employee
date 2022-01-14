INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Piers', 'Gaveston', 2, 0),
  ('Charles', 'LeRoi', 2, 0),
  ('Katherine', 'Mansfield', 1, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Molly', 'Ringwald', 3, 0),
  ('Jimmy', 'Fallon', 3, 0),
  ('Virginia', 'Woolf', 1, 1),
  ('Edward', 'Bellamy', 4, 0),
  ('Montague', 'Summers', 4, 0),
  ('Octavia', 'Butler', 4, 0),
  ('Unica', 'Zurn', 4, 0);

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Manager', 150000, 1),
  ('Account Manager', 100000, 1),
  ('Account Specialist', 80000, 1),
  ('Account Coordinator', 50000, 1),

INSERT INTO department
  (name)
VALUES
  ('Social'),
  ('SEO'),
  ('PPC'),
  ('Email'),

