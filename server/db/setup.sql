CREATE TABLE IF NOT EXISTS User (

  userId INTEGER PRIMARY KEY AUTOINCREMENT, /* FK */
  userName varchar(255),
  fName varchar(255),
  lName varchar(255),
  password varchar(255),
  address varchar(255),
  phoneNumber int(12),
  dob date,
  subExpiry date

  -- PRIMARY KEY (userId)

);

CREATE TABLE IF NOT EXISTS Location (

  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- id INT(11),
  name varchar(60),
  address varchar(80),
  lat float(10,6),
  lng float(10,6),
  type varchar(30)

  -- PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS Review (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  overallScore tinyint,
  reviewDate date,

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

);

CREATE TABLE IF NOT EXISTS Moisture (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasLeaks BOOLEAN,
  isDamp BOOLEAN,
  hasMould BOOLEAN,
  mouldLocation varchar(255),
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

);

CREATE TABLE IF NOT EXISTS Insulation (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  doubleGlazed BOOLEAN,
  underFloor BOOLEAN,
  wallAndCeiling BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

);

CREATE TABLE IF NOT EXISTS Heating (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasHeatpump BOOLEAN,
  hasFire BOOLEAN,
  hasHeaters BOOLEAN,
  warmth tinyint,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

);

CREATE TABLE IF NOT EXISTS WaterQuality (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  cleanWater BOOLEAN,
  goodPressure BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

);

CREATE TABLE IF NOT EXISTS Ventilation (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasExtractorFans BOOLEAN,
  hasWindows BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

);

CREATE TABLE IF NOT EXISTS Maintenance (

  locationId int(11) NOT NULL,
  userId int(11) NOT NULL,
  hasDrafts BOOLEAN,
  hasEarthquakeDamage BOOLEAN,
  comments varchar(255),

  FOREIGN KEY (locationId) REFERENCES Location(id),
  FOREIGN KEY (userId) REFERENCES User(userId)

);
